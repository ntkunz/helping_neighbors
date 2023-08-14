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

	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);
	const [email, setEmail] = useState(user.email);
	const [home, setHome] = useState(user.home);
	const [city, setCity] = useState(user.city);
	const [province, setProvince] = useState(user.province);
	const originalAddress = user.address;
	const [about, setAbout] = useState(user.about);
	const [offers, setOffers] = useState("");
	const [exchanges, setExchanges] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		let newOffers = "";
		let newExchanges = "";

		// Set user offers and exchanges based on offer value
		user.barters.forEach((barter) => {
			if (barter.offer === 1) {
				if (newOffers !== "") newOffers += purify(", " + barter.skill);
				else newOffers += purify(barter.skill);
			} else {
				if (newExchanges !== "") newExchanges += purify(", " + barter.skill);
				else newExchanges += purify(barter.skill);
			}
		});

		// Update state with the new offers and exchanges
		setOffers(newOffers.trim().replace(/,$/, ""));
		setExchanges(newExchanges.trim().replace(/,$/, ""));

		// eslint-disable-next-line
	}, []);

	//TODO: add ability to change email, password, and image
	//TODO: add ability to change status to active or inactive
	//TODO: add ability to block neighbor(s)

	//submit the edit user form
	async function editUser(e) {
		e.preventDefault();

		const cleanEmail = purify(email);
		const user_id = user.user_id;
		await removeSkills(purify(user_id));
		const address = purify(`${home} ${city} ${province}`);
		const addressRequest = address
			.replaceAll(",", " ")
			.replaceAll(" ", "+")
			.replaceAll(".", "+");

		let coords = [user.location.x, user.location.y];
		if (address !== originalAddress) {
			coords = await getNewUserGeo(addressRequest);
		}

		//separate offers and exchanges into skills array
		const offersSplit = offers.split(",");
		const exchangesSplit = exchanges.split(",");
		const skillsArray = [
			...offersSplit.map((offer) => ({
				skill: purify(offer.trim()),
				offer: true, // Indicate it as an offer
			})),
			...exchangesSplit.map((desire) => ({
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
			exchanges === "" ||
			firstName === "" ||
			lastName === "" ||
			email === "" ||
			home === "" ||
			city === "" ||
			province === ""
		) {
			alert("Oops, you missed a field, please fill out all fields.");
			return;
		}
		try {
			const response = await axios.put(
				`${api}/users`,
				{
					userId: purify(user_id),
					firstName: purify(firstName),
					lastName: purify(lastName),
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
			);
			setNeighbors([]);
			setUser(response.data);

			// axios
			// 	.get(`${api}/users`, {
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 			Authorization: `Bearer ${localStorage.getItem("token")}`,
			// 		},
			// 	})
			// 	.then((res) => {
			// 		if (res.data.length > 0) {
			// 			setNeighbors(res.data.neighbors);
			// 		}
			// 	});
		} catch (err) {
			console.log("Error editing user");
		}
	}

	/**
	 * Async function to remove skills from a user.
	 * @param {string} id - The ID of the user whose skills are being removed.
	 * @returns {Promise} - A promise that resolves to the response from the server.
	 */
	//TODO: reloacte remove skills function to utils folder
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

	//function to reveal password input field to confirm account deletion
	function deleteUserValidate(e) {
		e.preventDefault();
		document.querySelector(".edit__password").style.display = "flex";
		alert("Are you sure you want to delete this user?");
		document.querySelector('input[name="password"]').focus();
	}

	async function deleteUser(e) {
		e.preventDefault();
		const passwordValidate = purify(password);
		try {
			await axios.delete(`${api}/users`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data: {
					email: user.email,
					userId: user.user_id,
					password: passwordValidate,
				},
			});

			console.log("user deleted");

			//TODO: add removal of all userskills and messages from database

			setNeighbors([]);
			setLoggedIn(false);
			localStorage.removeItem("token");
			setUser({});
			return;
		} catch (err) {
			console.log("Error deleting user");
			alert("Unable to delete user. Check password and try again.");
		}
	}

	return (
		<div className='edit'>
			<h1 className='edit__title'>Edit your profile and barter on my friend</h1>
			<form onSubmit={editUser} method='post' className='edit__form'>
				<div className='edit__signup'>
					<label className='edit__label'>
						{" "}
						First Name
						<input
							type='text'
							className='edit__input'
							name='firstName'
							placeholder='First name'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</label>

					<label className='edit__label'>
						Last Name
						<input
							type='text'
							className='edit__input'
							name='lastName'
							placeholder='Last name'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</label>
					<label className='edit__label'>
						Your Email
						<input
							type='email'
							className='edit__input'
							name='email'
							placeholder='your email@something.com'
							value={email}
							onChange={(e) => setEmail(e.target.value.toLowerCase())}
							readOnly
						/>
					</label>
					<label className='edit__label'>
						Home Address
						<input
							type='text'
							className='edit__input'
							name='home'
							placeholder='123 Main St'
							value={home}
							onChange={(e) => setHome(e.target.value)}
						/>
					</label>
					<label className='edit__label'>
						City
						<input
							type='text'
							className='edit__input'
							name='city'
							placeholder='Any Town'
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
					</label>
					<label className='edit__label'>
						State/Province
						<input
							type='text'
							className='edit__input'
							name='province'
							placeholder='British Columbia'
							value={province}
							onChange={(e) => setProvince(e.target.value)}
						/>
					</label>
				</div>

				<div className='edit__personalize'>
					<label className='edit__label'>
						Tell your neighbors about yourself
						<textarea
							className='edit__input textarea'
							name='about'
							rows='3'
							maxLength={240}
							placeholder="Feel free to describe your interests here, and why you're excited to connect with your fellow neighbors."
							value={about}
							onChange={(e) => setAbout(e.target.value)}
						/>
					</label>
					<label className='edit__label'>
						Skills you can offer
						<input
							type='text'
							className='edit__input'
							name='offers'
							placeholder='ie Gardening, Landscaping, Construction'
							value={offers}
							onChange={(e) => setOffers(e.target.value)}
						/>
					</label>
					<p className='edit__desc'>
						One or two words for each offering, separated by commas
					</p>
					<label className='edit__label'>
						What you would like to barter for
						<input
							type='text'
							className='edit__input'
							name='exchanges'
							placeholder='ie Cooking, Running Errands, Cat Sitting'
							value={exchanges}
							onChange={(e) => setExchanges(e.target.value)}
						/>
					</label>
					<p className='edit__desc'>
						One or two words for each thing you'd like to barter for, separated
						by commas
					</p>
					<button className='edit__btn'>Edit Your Profile</button>
					<button
						onClick={(e) => {
							e.preventDefault();
							navigate("/neighbors");
						}}
						className='edit__btn'>
						Cancel
					</button>
					<span className='edit__btn' onClick={deleteUserValidate}>
						Delete Account
					</span>
					{/* add password field to verify user to delete account  */}
					<div className='edit__password'>
						<label className='edit__label'>
							Enter your password to delete your account
							<input
								type='password'
								className='edit__input'
								name='password'
								autoComplete='current-password'
								placeholder=''
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>
						<p className='edit__desc'>
							This cannot be undone and will delete all of your data from
							Helping Neighbors
						</p>
						<button className='edit__btn delete__btn' onClick={deleteUser}>
							Delete Account
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
