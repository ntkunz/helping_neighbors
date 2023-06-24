import "./NewUserPage.scss";
import { v4 } from "uuid";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import purify from "../../utils/purify";
import getNewUserGeo from "../../utils/getNewUserGeo";
import addSkills from "../../utils/addSkills";

export default function NewUserPage({
	setUser,
	setLoggedIn,
	setToken,
	setNeighbors,
}) {
	const navigate = useNavigate();

	const api = process.env.REACT_APP_API_URL;
	const geoKey = process.env.REACT_APP_HERE_API_KEY;
	const geoApi = process.env.REACT_APP_GEO_URL;

	const [img, setImg] = useState(null);

	function capFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	//create new user on form submit and redirect to user page
	async function createNewUser(e) {
		setUser({});
		setNeighbors({});
		e.preventDefault();
		const errorElement = document.querySelector(".error");

		const password = purify(e.target.password.value);
		const passwordConfirm = purify(e.target.password_confirm.value);
		// Throw error if passwords do not match
		if (password !== passwordConfirm) {
			errorElement.style.display = "inline-block";
			errorElement.innerHTML = "Passwords do not match";
			return;
		}

		// Image validation
		if (img !== null && img !== "https://source.unsplash.com/featured/small") {
			// Throw error if uploaded image is too large
			if (img.data.size > 1000000) {
				errorElement.style.display = "inline-block";
				errorElement.innerHTML =
					"Image too large, please add an image under 1MB";
				return;
			}

			//return alert if not an image
			if (!img.data.type.includes("image")) {
				errorElement.style.display = "inline-block";
				errorElement.innerHTML = "Please add an image file";
				return;
			}
		}

		//add default value for image if no image is uploaded
		if (img === null) {
			// setImg('"https://source.unsplash.com/featured"');
			setImg('default');
		}

		//clear error if passwords match
		errorElement.style.display = "none";

		const user_id = v4();
		const first_name = purify(capFirst(e.target.first_name.value));
		const last_name = purify(capFirst(e.target.last_name.value));
		const email = purify(e.target.email.value.toLowerCase());

		// Throw error if email is already in use in databse
		const newEmail = await axios.post(`${api}/users/newemail`, { email });
		if (newEmail.status === 202) {
			errorElement.style.display = "inline-block";
			errorElement.innerHTML = "Invalid email, email may already be in use";
			return;
		}

		// Clear error if passwords match
		errorElement.style.display = "none";
		errorElement.innerHTML = "";

		const home = purify(capFirst(e.target.home.value));
		const city = purify(capFirst(e.target.city.value));
		const province = purify(capFirst(e.target.province.value));
		const address = `${home} ${city} ${province}`;
		const addressRequest = address
			.replaceAll(",", " ")
			.replaceAll(" ", "+")
			.replaceAll(".", "+");
		const coords = await getNewUserGeo(addressRequest); // wait for the coordinates
		const status = "active";
		const about = purify(e.target.about.value);

		const offers = purify(e.target.offers.value);
		const offersSplit = offers.split(",");
		const desires = purify(e.target.desires.value);
		const desiresSplit = desires.split(",");

		//create skills array from offers and desires
		const skillsArray = [
			...offersSplit.map((offer) => ({
				skill: offer.trim(),
				offer: true, // Indicate it as an offer
			})),
			...desiresSplit.map((desire) => ({
				skill: desire.trim(),
				offer: false, // Indicate it as a desire
			})),
		];

		//add user to users table
		try {
			const response = await Promise.all([
				axios.post(`${api}/users`, {
					user_id: user_id,
					first_name: first_name,
					last_name: last_name,
					email: email,
					password: password,
					status: status,
					coords: coords,
					about: about,
					address: address,
					home: home,
					city: city,
					province: province,
				}),
			]);

			//BLAIR!!!!!!!!!!! SHOULD I ADD THESE ACTIONS BETWEEN HERE AND THE CATCH BELOW TO AFTER THE CATCH?
			//SOMETHING LIKE if (response) {then do all the stuff below}?!!!!!!!!!!!!!!!!!!1

			const newUserToken = response[0].data.token;
			const newUserId = response[0].data.userId;

			await setToken(newUserToken);
			await addSkills(skillsArray, newUserId);

			//upload image to users api once user_id is created if img is not null or "default"
			if (img !== null && img !== "default") {
				await submitImage(newUserId);
			}

			const getNewUser = await axios.get(`${api}/users/verify`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			const getNewNeighbors = await axios.get(`${api}/users`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			setUser(getNewUser.data);
			setNeighbors(getNewNeighbors.data.neighbors);
			setLoggedIn(true);
			navigate("/");
		} catch (err) {
			console.log("Error creating new user");
		}
	}

	//upload image to users api function (move to utils file?)
	const submitImage = async (userId) => {
		let formData = new FormData();
		formData.append("file", img.data);
		formData.append("user_id", userId);
		const response = await axios.post(`${api}/users/image`, formData, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "multipart/form-data",
			},
		});
		return response;
	};

	//set image function with file input (move to utils file?)
	const handleFileChange = async (e) => {
		//return alert if image too large
		if (e.target.files[0].size > 1000000) {
			return alert("Image too large, please add an image under 1MB");
		}
		//return alert if not an image
		if (!e.target.files[0].type.includes("image")) {
			return alert("Please add an image file");
		}
		//set image state if image is valid
		const img = {
			data: e.target.files[0],
		};
		setImg(img);
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
							name="first_name"
							placeholder="First name"
						/>
					</label>
					<label className="new__label">
						Last Name
						<input
							type="text"
							className="new__input"
							name="last_name"
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
						/>
					</label>
					<label className="new__label">
						Password
						<input
							type="password"
							autoComplete="new-password"
							className="new__input"
							name="password"
							placeholder="Password"
						/>
					</label>
					<label className="new__label">
						Confirm
						<input
							type="password"
							autoComplete="new-password"
							className="new__input"
							name="password_confirm"
							placeholder="Password again"
						/>
					</label>
					<p className="new__requirement">
						Password must be at least 8 characters and contain at least one
						uppercase letter, one lowercase letter, one number and one special
						character
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
							name="desires"
							placeholder="ie Cooking, Running Errands, Cat Sitting"
						/>
					</label>
					<p className="new__desc">
						One or two words for each thing you'd like to barter for, separated
						by commas
					</p>
					<label className="new__label upload">
						Upload a profile picture
						<input type="file" name="file" onChange={handleFileChange}></input>
					</label>
					<p className="edit__desc">File size limit: 1mb</p>

					<p className="error"></p>
					<button className="new__btn">Start Meeting Your Neighbors</button>
				</div>
			</form>
		</div>
	);
}
