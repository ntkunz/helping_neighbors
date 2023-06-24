import "./EditUserPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import purify from "../../utils/purify";
import getNewUserGeo from "../../utils/getNewUserGeo";
import addSkills from "../../utils/addSkills";

export default function EditUserPage({
	user,
	setNeighbors,
	setUser,
	setLoggedIn,
}) {
	const navigate = useNavigate();

	const api = process.env.REACT_APP_API_URL;

	const [first_name, setFirstName] = useState(user.first_name);
	const [last_name, setLastName] = useState(user.last_name);
	const [email, setEmail] = useState(user.email);
	const [home, setHome] = useState(user.home);
	const [city, setCity] = useState(user.city);
	const [province, setProvince] = useState(user.province);
	const [originalAddress, setOriginalAddress] = useState(user.address);
	const [active, setActive] = useState(user.status); //to be used once user is able to change status
	const [about, setAbout] = useState(user.about);
	const [offers, setOffers] = useState("");
	const [desires, setDesires] = useState("");
	const [password, setPassword] = useState("");

	/**
	 * This effect runs once on component mount and updates the state with the user's barters
	 */
	useEffect(() => {
		// Initialize newOffers and newDesires
		let newOffers = "";
		let newDesires = "";
		// Loop through each key in user.barters

		Object.keys(user.barters).forEach((key, index) => {
			// If the value for the current key is 1, add it to newOffers
			if (user.barters[key] === 1) {
				newOffers += purify(` ${key},`);
			} else {
				// Otherwise, add it to newDesires
				newDesires += purify(` ${key},`);
			}
		});
		// Update state with the new offers and desires
		setOffers(newOffers.trim().replace(/,$/, ""));
		setDesires(newDesires.trim().replace(/,$/, ""));
		// Ignore the "missing dependencies" warning for this effect
		// because it only needs to run once on mount
		// eslint-disable-next-line
	}, []);

	//==============need to add ability to change email, password, and image=================
	//============also need to add ability to change status to active or inactive=============

	//submit the edit user form
	async function editUser(e) {
		e.preventDefault();

		const cleanEmail = purify(email);
		const user_id = user.user_id;

		await removeSkills(purify(user_id)); //remove all user skills from table to add updated ones
		const address = purify(`${home} ${city} ${province}`);
		const addressRequest = address
			.replaceAll(",", " ")
			.replaceAll(" ", "+")
			.replaceAll(".", "+");

		let coords = [user.location.x, user.location.y];
		// Check if the address has changed
		if (address !== originalAddress) {
			coords = await getNewUserGeo(addressRequest); // get new address coordinates
		}

		//separate offers and desires into skills array
		const offersSplit = offers.split(",");
		const desiresSplit = desires.split(",");
		const skillsArray = [
			...offersSplit.map((offer) => ({
				skill: purify(offer.trim()),
				offer: true, // Indicate it as an offer
			})),
			...desiresSplit.map((desire) => ({
				skill: purify(desire.trim()),
				offer: false, // Indicate it as a desire
			})),
		];

		//update skills in userskills table
		await addSkills(skillsArray, user_id);

		if (
			address === "" ||
			about === "" ||
			offers === "" ||
			desires === "" ||
			first_name === "" ||
			last_name === "" ||
			email === "" ||
			home === "" ||
			city === "" ||
			province === ""
		) {
			alert("Oops, you missed a field, please fill out all fields.");
			return;
		}
		try {
			const response = await Promise.all([
				axios.put(
					`${api}/users`,
					{
						user_id: purify(user_id),
						first_name: purify(first_name),
						last_name: purify(last_name),
						email: cleanEmail,
						coords: coords,
						about: purify(about),
						address: address,
						home: purify(home),
						city: purify(city),
						province: purify(province),
					},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				),
			]);

			//set user's new data
			setUser(response[0].data);
			//clear old neighbors incase address changed
			setNeighbors([]);
			//api call to return all neighbors
			axios
				.get(`${api}/users`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				})
				.then((res) => {
					if (res.data.length > 0) {
						//set new neighbors
						setNeighbors(res.data.neighbors);
					}
				});
		} catch (err) {
			console.log("Error editing user");
		}
	}

	/**
	 * Async function to remove skills from a user.
	 * @param {string} id - The ID of the user whose skills are being removed.
	 * @returns {Promise} - A promise that resolves to the response from the server.
	 */
	async function removeSkills(id) {
		try {
			const response = await axios.delete(`${api}/userskills/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			return response;
		} catch (err) {
			console.log("Error removing skills");
		}
	}

	//UPDATE USER SKILLS IN THE SAME WAY AS ADDING, ALL AS ONE CALL!!
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	//function to add skills to user
	async function editSkills(arr, id, which) {
		try {
			const response = await Promise.all(
				arr.map((item) =>
					axios.post(
						`${api}/userskills`,
						{
							user_id: id,
							skill: item,
							offer: which,
						},
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem("token")}`,
							},
						}
					)
				)
			);
			return response;
		} catch (err) {
			console.log("Error adding skills: ", err);
		}
	}

	//function to reveal password input field to confirm account deletion
	function deleteUserValidate(e) {
		e.preventDefault();
		document.querySelector(".edit__password").style.display = "flex";
		alert("Are you sure you want to delete this user?");
		document.querySelector('input[name="password"]').focus();
	}

	//function to delete user
	async function deleteUser(e) {
		e.preventDefault();
		const passwordValidate = purify(password);
		try {
			await axios.delete(`${api}/users`, {
				headers: {
					// Add authorization header with token from local storage
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data: {
					email: user.email,
					userId: user.user_id,
					password: passwordValidate,
				},
			});

			//here if response is 200 then delete userskills and messages
			setNeighbors([]);
			setLoggedIn(false);
			localStorage.removeItem("token");
			setUser({});
			return "You have been deleted";
		} catch (err) {
			console.log("Error deleting user");
			alert("Unable to delete user. Check password and try again.");
		}
	}

	return (
		<div className="edit">
			<h1 className="edit__title">Edit your profile and barter on my friend</h1>
			<form onSubmit={editUser} method="post" className="edit__form">
				<div className="edit__signup">
					<label className="edit__label">
						{" "}
						First Name
						<input
							type="text"
							className="edit__input"
							name="first_name"
							placeholder="First name"
							value={first_name}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</label>

					<label className="edit__label">
						Last Name
						<input
							type="text"
							className="edit__input"
							name="last_name"
							placeholder="Last name"
							value={last_name}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</label>
					<label className="edit__label">
						Your Email
						<input
							type="email"
							className="edit__input"
							name="email"
							placeholder="your email@something.com"
							value={email}
							onChange={(e) => setEmail(e.target.value.toLowerCase())}
							readOnly
						/>
					</label>
					<label className="edit__label">
						Home Address
						<input
							type="text"
							className="edit__input"
							name="home"
							placeholder="123 Main St"
							value={home}
							onChange={(e) => setHome(e.target.value)}
						/>
					</label>
					<label className="edit__label">
						City
						<input
							type="text"
							className="edit__input"
							name="city"
							placeholder="Any Town"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
					</label>
					<label className="edit__label">
						State/Province
						<input
							type="text"
							className="edit__input"
							name="province"
							placeholder="British Columbia"
							value={province}
							onChange={(e) => setProvince(e.target.value)}
						/>
					</label>
				</div>

				<div className="edit__personalize">
					<label className="edit__label">
						Tell your neighbors about yourself
						<textarea
							className="edit__input textarea"
							name="about"
							rows="3"
							maxLength={240}
							placeholder="Feel free to describe your interests here, and why you're excited to connect with your fellow neighbors."
							value={about}
							onChange={(e) => setAbout(e.target.value)}
						/>
					</label>
					<label className="edit__label">
						Skills you can offer
						<input
							type="text"
							className="edit__input"
							name="offers"
							placeholder="ie Gardening, Landscaping, Construction"
							value={offers}
							onChange={(e) => setOffers(e.target.value)}
						/>
					</label>
					<p className="edit__desc">
						One or two words for each offering, separated by commas
					</p>
					<label className="edit__label">
						What you would like to barter for
						<input
							type="text"
							className="edit__input"
							name="desires"
							placeholder="ie Cooking, Running Errands, Cat Sitting"
							value={desires}
							onChange={(e) => setDesires(e.target.value)}
						/>
					</label>
					<p className="edit__desc">
						One or two words for each thing you'd like to barter for, separated
						by commas
					</p>
					<button className="edit__btn">Edit Your Profile</button>
					<button
						onClick={(e) => {
							e.preventDefault();
							navigate("/neighbors");
						}}
						className="edit__btn"
					>
						Cancel
					</button>
					<button className="edit__btn" onClick={deleteUserValidate}>
						Delete Account
					</button>
					{/* add password field to verify user to delete account  */}
					<div className="edit__password">
						<label className="edit__label">
							Enter your password to delete your account
							<input
								type="password"
								className="edit__input"
								name="password"
								placeholder=""
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>
						<p className="edit__desc">
							This cannot be undone and will delete all of your data from
							Helping Neighbors
						</p>
						<button className="edit__btn delete__btn" onClick={deleteUser}>
							Delete Account
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
