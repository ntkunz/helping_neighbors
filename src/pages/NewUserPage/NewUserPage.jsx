import "./NewUserPage.scss";
import { v4 } from "uuid";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import purify from "../../utils/purify";
import getNewUserGeo from "../../utils/getNewUserGeo";
// import addSkills from "../../utils/addSkills";
import submitImage from "../../utils/submitImage";
import validateEmail from "../../utils/validateEmail";
import {
  passwordLength,
  passwordContainsUppercase,
  passwordContainsLowercase,
  passwordContainsNumber,
  passwordContainsSpecialCharacter,
  passwordsMatch,
} from "../../utils/validatePassword";
import handleImageFileChange from "../../utils/handleImageFileChange";
import { makeApiCall } from "../../utils/api";

export default function NewUserPage({ setToken }) {
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [errorActive, setErrorActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiCalled, setApiCalled] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Form validatoin for email and password
  const isEmailValid = useMemo(() => validateEmail(email), [email]);
  const isPasswordEightCharacters = useMemo(
    () => passwordLength(password),
    [password]
  );
  const doesPasswordHaveOneNumber = useMemo(
    () => passwordContainsNumber(password),
    [password]
  );
  const doesPasswordHaveOneSpecialCharacter = useMemo(
    () => passwordContainsSpecialCharacter(password),
    [password]
  );
  const doesPasswordHaveOneUppercase = useMemo(
    () => passwordContainsUppercase(password),
    [password]
  );
  const doesPasswordHaveOneLowercase = useMemo(
    () => passwordContainsLowercase(password),
    [password]
  );
  const doPasswordsMatch = useMemo(
    () => passwordsMatch(password, passwordConfirm),
    [passwordConfirm, password]
  );

  function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //wakeup server on page load
  useEffect(() => {
    makeApiCall("GET", "users/newemail");
    //eslint-disable-next-line
  }, []);

  async function createNewUser(e) {
    e.preventDefault();

    if (
      !isEmailValid ||
      !isPasswordEightCharacters ||
      !doesPasswordHaveOneNumber ||
      !doesPasswordHaveOneSpecialCharacter ||
      !doesPasswordHaveOneUppercase ||
      !doesPasswordHaveOneLowercase
    ) {
      setErrorMessage("Please make sure all fields are filled out");
      setErrorActive(true);
      return;
    }

    setErrorMessage("Creating new user, please be patient");
    setErrorActive(false);
    setApiCalled(true);

    const email = purify(e.target.email.value.toLowerCase());
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email");
      setErrorActive(true);
      setApiCalled(false);
      return;
    }

    const password = purify(e.target.password.value);
    const passwordConfirm = purify(e.target.password_confirm.value);

    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match");
      setErrorActive(true);
      setApiCalled(false);
      return;
    }

    // Image size validation
    if (img !== null && img !== "default") {
      if (img.size > 1000000) {
        setImg(null);
        document.getElementById("image-input").value = "";
        setErrorMessage("Image too large, please add an image under 1MB");
        setErrorActive(true);
        setApiCalled(false);
        return;
      }
    }

    if (img === null) {
      setImg("default");
    }

    const userId = v4();
    const firstName = purify(capFirst(e.target.firstName.value));
    const lastName = purify(capFirst(e.target.lastName.value));

    // Throw error if email is already in use in databse
    const newEmail = await makeApiCall("POST", "users/newemail", { email });
    // TODO: reinstate status check when backend adjusted to account for fetch not seeting status 
    if (newEmail.includes("User found with email")) {  
    // if (newEmail.status === 202) {
      setErrorMessage("Invalid email, may already be in use");
      setErrorActive(true);
      setApiCalled(false);
      return;
    }

    // TODO : wrap get coords, create user, and add skills in a promise all 
    const home = purify(capFirst(e.target.home.value));
    const city = purify(capFirst(e.target.city.value));
    const province = purify(capFirst(e.target.province.value));
    const address = `${home} ${city} ${province}`;
    const addressRequest = address
      .replaceAll(",", " ")
      .replaceAll(" ", "+")
      .replaceAll(".", "+");
    const coords = await getNewUserGeo(addressRequest); // wait for the coordinates
    //TODO : create break and return if unable to get new user geo
    if (coords === null) {
      // Handle the case where coordinates could not be obtained
      setErrorMessage("Error getting user coordinates");
      setErrorActive(true);
      setApiCalled(false);
      return;
    }

    const status = "active";
    const about = purify(e.target.about.value);

    const offers = purify(e.target.offers.value);
    const offersSplit = offers.split(",");
    const exchanges = purify(e.target.exchanges.value);
    const exchangesSplit = exchanges.split(",");

    //create skills array from offers and exchanges
    const skillsArray = [
      ...offersSplit.map((offer) => ({
        skill: offer,
        offer: true, // Indicate it as an offer
      })),
      ...exchangesSplit.map((desire) => ({
        skill: desire,
        offer: false, // Indicate it as a desire
      })),
    ];

    if (
      userId === "" ||
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === "" ||
      home === "" ||
      city === "" ||
      province === "" ||
      address === "" ||
      about === "" ||
      offers === "" ||
      exchanges === ""
    ) {
      setErrorMessage("Oops, you missed a field, please fill out all fields");
      setErrorActive(true);
      setApiCalled(false);
      return;
    }

    const newUserData = {
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      status: status,
      coords: coords,
      about: about,
      address: address,
      home: home,
      city: city,
      province: province,
    };

    try {
      // TODO: Await all calls before writing to database
      const newUser = await makeApiCall("POST", "users", newUserData);
      await makeApiCall("POST", `userskills`, { user_id: userId, skills: skillsArray });
      const newUserToken = newUser.token;
      // Removed temporarily to refactor image upload
      // if (img !== null && img !== "default") {
      //   await submitImage(userId, newUserToken, img);
      // }
      setToken(newUserToken);
      navigate("/");
    } catch (err) {
      setErrorMessage("Error creating new user");
      setErrorActive(true);
      setApiCalled(false);
    }
  }

  const handleImageChange = (e) => {
    handleImageFileChange(
      e,
      setImg,
      setErrorMessage,
      setErrorActive,
      setApiCalled
    );
  };

  const removeImage = (e) => {
    e.preventDefault();
    setImg(null);
    document.getElementById("image-input").value = "";
  };

  return (
    <div className="new">
      <h1 className="new__title">
        Sign up to start bartering your way to a better neighborhood
      </h1>
      <form
        onSubmit={createNewUser}
        method="post"
        className="new__form"
        noValidate
      >
        <div className="new__signup">
          <label className="new__label">
            {" "}
            First Name
            <input
              type="text"
              className="new__input"
              name="firstName"
              placeholder="First name"
            />
          </label>
          <label className="new__label">
            Last Name
            <input
              type="text"
              className="new__input"
              name="lastName"
              placeholder="Last name"
            />
          </label>
          <label className="new__label">
            Your Email
            <input
              type="email"
              autoComplete="username"
              className="new__input"
              name="email"
              placeholder="your email@something.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <p
            className={`new__valid-label ${
              !isEmailValid ? "new__valid-label--active" : ""
            }`}
          >
            Valid Email
          </p>

          <label className="new__label">
            Password
            <input
              type="password"
              autoComplete="new-password"
              className="new__input"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>

          <p
            className={`new__valid-label ${
              !isPasswordEightCharacters ? "new__valid-label--active" : ""
            }`}
          >
            At least 8 characters
          </p>
          <p
            className={`new__valid-label ${
              !doesPasswordHaveOneNumber ? "new__valid-label--active" : ""
            }`}
          >
            At least one number
          </p>
          <p
            className={`new__valid-label ${
              !doesPasswordHaveOneSpecialCharacter
                ? "new__valid-label--active"
                : ""
            }`}
          >
            At least one special character
          </p>
          <p
            className={`new__valid-label ${
              !doesPasswordHaveOneUppercase ? "new__valid-label--active" : ""
            }`}
          >
            At least one uppercase letter
          </p>
          <p
            className={`new__valid-label ${
              !doesPasswordHaveOneLowercase ? "new__valid-label--active" : ""
            }`}
          >
            At least one lowercase letter
          </p>
          <label className="new__label">
            Confirm
            <input
              type="password"
              autoComplete="new-password"
              className="new__input"
              name="password_confirm"
              placeholder="Password again"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
            />
          </label>
          <p
            className={`new__valid-label ${
              !doPasswordsMatch ? "new__valid-label--active" : ""
            }`}
          >
            Passwords match
          </p>
          <label className="new__label">
            Home Address
            <input
              type="text"
              className="new__input"
              name="home"
              placeholder="123 Main St"
            />
          </label>
          <label className="new__label">
            City
            <input
              type="text"
              className="new__input"
              name="city"
              placeholder="Any Town"
            />
          </label>
          <label className="new__label">
            State/Province
            <input
              type="text"
              className="new__input"
              name="province"
              placeholder="British Columbia"
            />
          </label>
        </div>

        <div className="new__personalize">
          <label className="new__label">
            Tell your neighbors about yourself
            <textarea
              className="new__input textarea"
              name="about"
              rows="3"
              maxLength={240}
              placeholder="Feel free to describe your interests here, and why you're excited to connect with your fellow neighbors."
            />
          </label>
          <label className="new__label">
            Skills you can offer
            <input
              type="text"
              className="new__input"
              name="offers"
              placeholder="ie Gardening, Landscaping, Construction"
            />
          </label>
          <p className="new__desc">
            One or two words for each offering, separated by commas
          </p>
          <label className="new__label">
            What you would like to barter for
            <input
              type="text"
              className="new__input"
              name="exchanges"
              placeholder="ie Cooking, Running Errands, Cat Sitting"
            />
          </label>
          <p className="new__desc">
            One or two words for each thing you'd like to barter for, separated
            by commas
          </p>
          {/* Image upload disabled for refactor to use netlify blobs for image storage */}
          {/* <label className="new__label upload">
            Upload a profile picture
            <input
              type="file"
              name="file"
              id="image-input"
              onChange={handleImageChange}
            ></input>
            <p className="upload__desc">File size limit: 1mb</p>
            <button className="new__default-img-btn" onClick={removeImage}>
              Use default image
            </button>
          </label> */}
          {errorActive && <p className="new__error">{errorMessage}</p>}
          {apiCalled && <p className="new__in-progress">{errorMessage}</p>}
          <button
            className="new__btn"
            disabled={
              !isEmailValid ||
              !doesPasswordHaveOneLowercase ||
              !doesPasswordHaveOneUppercase ||
              !doesPasswordHaveOneSpecialCharacter ||
              !doesPasswordHaveOneNumber ||
              !isPasswordEightCharacters ||
              !doPasswordsMatch
            }
          >
            Start Meeting Your Neighbors
          </button>
        </div>
      </form>
    </div>
  );
}
