import "./NewUserPage.scss";
import { v4 } from "uuid";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import setReturnedUsers from '../../utils/setReturnedUsers';
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
		const user_id = v4();
		const first_name = capFirst(e.target.first_name.value);
		const last_name = capFirst(e.target.last_name.value);
		const email = e.target.email.value.toLowerCase();
		const password = e.target.password.value;
		const home = capFirst(e.target.home.value);
		const city = capFirst(e.target.city.value);
		const province = capFirst(e.target.province.value);
		const address = `${home} ${city} ${province}`;
		const addressRequest = address
			.replaceAll(",", " ")
			.replaceAll(" ", "+")
			.replaceAll(".", "+");
		const coords = await getNewUserGeo(addressRequest); // wait for the coordinates
		const status = "active";
		const about = e.target.about.value;
		const offers = e.target.offers.value;
		const offersSplit = offers.split(",");
		const offersArray = offersSplit.map((offer) => offer.trim(" "));
		//add skills to user_skills table
		await addSkills(offersArray, user_id, true);
		const desires = e.target.desires.value;
		const desiresSplit = desires.split(",");
		const desiresArray = desiresSplit.map((desire) => desire.trim(" "));
		//add barters to user_skills table
		await addSkills(desiresArray, user_id, false);
		//add user to users table
		try {
			const response = await Promise.all([
				axios.post(`${api}/users/newuser`, {
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
			//upload image to users api once user_id is created
			await submitImage(response[0].data.user_id);
			await axios.post(`${api}/users`, { email }).then((res) => {
				if (res.data.length > 0) {

					//set user and neighbor states, set token, set logged in
					setReturnedUsers(email, res.data, setNeighbors, setLoggedIn, setToken, setUser);

					navigate("/neighbors");
			}})
		} catch (err) {
			console.log("Error creating new user: ", err);
		}
	}

	//api call to return lat long from address as lat and long
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

	//add userskills to user page function
	async function addSkills(arr, id, which) {
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

	//upload image to users api
	const submitImage = async (userId) => {
		let formData = new FormData();
		formData.append("file", img.data);
		formData.append("user_id", userId);
		const response = await axios.post(`${api}/users/image`, formData);
		if (response) console.log(response.statusText);
	};

	//set image function with url and file
	const handleFileChange = (e) => {
		const img = {
			// preview: URL.createObjectURL(e.target.files[0]),
			data: e.target.files[0],
		};
		setImg(img);
	};

	return (
		<div className="new">
			<h1 className="new__title">
				Sign up to start bartering your way to a better neighborhood
			</h1>
			<form onSubmit={createNewUser} method="post" className="new__form">
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
							type="text"
							className="new__input"
							name="email"
							placeholder="your email@something.com"
						/>
					</label>
					<label className="new__label">
						Password
						<input
							type="password"
							className="new__input"
							name="password"
							placeholder="Password"
						/>
					</label>
					<label className="new__label">
						Confirm
						<input
							type="password"
							className="new__input"
							name="password_confirm"
							placeholder="Password again"
						/>
					</label>
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

					<button className="new__btn">Start Meeting Your Neighbors</button>
				</div>
			</form>
		</div>
	);
}
