import "./EditUserPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditUserPage({ user, setUser, setNeighbors }) {
	const navigate = useNavigate();

	const api = process.env.REACT_APP_API_URL;
	const geoKey = process.env.REACT_APP_HERE_API_KEY;
	const geoApi = process.env.REACT_APP_GEO_URL;

	const [first_name, setFirstName] = useState(user.first_name);
	const [last_name, setLastName] = useState(user.last_name);
	const [email, setEmail] = useState(user.email);
	// const [password, setPassword] = useState(user.password);
	const [home, setHome] = useState(user.home);
	const [city, setCity] = useState(user.city);
	const [province, setProvince] = useState(user.province);
	// const [active, setActive] = useState(user.status);
	const [about, setAbout] = useState(user.about);
	const [offers, setOffers] = useState("");
	const [desires, setDesires] = useState("");

	useEffect(() => {
		getSkills();
		//eslint-disable-next-line
	}, []);

	function getSkills() {
		axios
			.get(`${api}/users/skills/${user.user_id}`)
			.then((response) => {
				const offeringSkills = [];
				const exchangeSkills = [];
				response.data.forEach((skill) => {
					if (skill.offer === 1) {
						offeringSkills.push(skill.skill);
					} else {
						exchangeSkills.push(skill.skill);
					}
				});
				setOffers(offeringSkills.join(", "));
				setDesires(exchangeSkills.join(", "));
			})
			.catch((error) => {
				console.log("error", error);
			});
	}

	function capFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	//submit the edit user form
	async function editUser(e) {
		e.preventDefault();

		const user_id = user.user_id;
		await removeSkills(user_id); //remove all user skills from table to add updated ones
		const address = `${home} ${city} ${province}`;
		const addressRequest = address
			.replaceAll(",", " ")
			.replaceAll(" ", "+")
			.replaceAll(".", "+");
		const coords = await getNewUserGeo(addressRequest); // wait for the coordinates
		const offersSplit = offers.split(",");
		const offersArray = offersSplit.map((offer) => offer.trim(" "));
		await editSkills(offersArray, user_id, true); //add offers to user skills table
		const desiresSplit = desires.split(",");
		const desiresArray = desiresSplit.map((desire) => desire.trim(" "));
		await editSkills(desiresArray, user_id, false); //add barters to user skills table
		// const image_url = user.image_url;
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
				axios.post(`${api}/users/edituser`, {
					user_id: user_id,
					first_name: first_name,
					last_name: last_name,
					email: email,
					// password: password,
					// status: active,
					coords: coords,
					about: about,
					address: address,
					home: home,
					city: city,
					province: province,
				}),
			]);
			setNeighbors([]);
			setUser(response[0].data);
			navigate("/");
		} catch (err) {
			console.log("Error creating new user: ", err);
		}
	}

	//api call to return lat long from address
	async function getNewUserGeo(addressRequest) {
		try {
			const res = await axios.get(
				`${geoApi}?q=${addressRequest}&apiKey=${geoKey}`
			);
			return [res.data.items[0].position.lng, res.data.items[0].position.lat];
		} catch (err) {
			console.log("Error returning lat long from api ", err);
		}
	}

	//function to remove skills from user
	async function removeSkills(id) {
		try {
			const response = await axios.delete(`${api}/userskills/${id}`);
			return response;
		} catch (err) {
			console.log("Error removing skills: ", err);
		}
	}

	//function to add skills to user
	async function editSkills(arr, id, which) {
		try {
			const response = await Promise.all(
				arr.map((item) =>
					axios.post(`${api}/userskills`, {
						user_id: id,
						skill: item,
						offer: which,
					})
				)
			);
			return response;
		} catch (err) {
			console.log("Error adding skills: ", err);
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
							onChange={(e) => setFirstName(capFirst(e.target.value))}
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
							onChange={(e) => setLastName(capFirst(e.target.value))}
						/>
					</label>
					<label className="edit__label">
						Your Email
						<input
							type="text"
							className="edit__input"
							name="email"
							placeholder="your email@something.com"
							value={email}
							onChange={(e) => setEmail(e.target.value.toLowerCase())}
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
							onChange={(e) => setHome(capFirst(e.target.value))}
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
							onChange={(e) => setCity(capFirst(e.target.value))}
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
							onChange={(e) => setProvince(capFirst(e.target.value))}
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
							onChange={(e) => setOffers(capFirst(e.target.value))}
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
							onChange={(e) => setDesires(capFirst(e.target.value))}
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
				</div>
			</form>
		</div>
	);
}
