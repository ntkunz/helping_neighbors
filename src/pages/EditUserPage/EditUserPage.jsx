import "./EditUserPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate, Link } from "react-router-dom";


export default function EditUserPage({ user, setUser, setNeighbors }) {

	const navigate = useNavigate();

	const api = process.env.REACT_APP_API_URL;
	const geoKey = process.env.REACT_APP_HERE_API_KEY;
	const geoApi = process.env.REACT_APP_GEO_URL;

	const [offering, setOffering] = useState([]);
	const [exchange, setExchange] = useState([]);

	const [first_name, setFirstName] = useState(user.first_name);
	const [last_name, setLastName] = useState(user.last_name);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState(user.password);
	const [home, setHome] = useState(user.home);
	const [city, setCity] = useState(user.city);
	const [province, setProvince] = useState(user.province);
	const [active, setActive] = useState(user.status);
	const [about, setAbout] = useState(user.about);
	const [offers, setOffers] = useState('');
	const [desires, setDesires] = useState('');

	useEffect(() => {
		getSkills();
	}, []);

	function getSkills() {
		console.log('userId: ', user.user_id)
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
				setOffers(offeringSkills.join(', '));
				setDesires(exchangeSkills.join(', '));
			})
			.catch((error) => {
				console.log("error", error);
			});
	}

	function capFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	async function editUser(e) {
		e.preventDefault();
		const user_id = user.user_id;
		// const user_id = v4();
		// const first_name = capFirst(e.target.first_name.value);
		// const last_name = capFirst(e.target.last_name.value);
		// const email = e.target.email.value.toLowerCase();
		// const password = e.target.password.value;
		// const password_confirm = e.target.password_confirm.value;
		// const image_url = "https://picsum.photos/300";
		// const home = capFirst(e.target.home.value);
		// const city = capFirst(e.target.city.value);
		// const province = capFirst(e.target.province.value);
		const address = `${home} ${city} ${province}`;
		console.log('address: ', address)
		const addressRequest = address
			.replaceAll(",", " ")
			.replaceAll(" ", "+")
			.replaceAll(".", "+");
		const coords = await getNewUserGeo(addressRequest); // wait for the coordinates
		// const status = "active";
		// const about = e.target.about.value;
		// const offers = e.target.offers.value;
		const offersSplit = offers.split(",");
		const offersArray = offersSplit.map((offer) => offer.trim(" "));
		const addOffers = await editSkills(offersArray, user_id, true);
		// const desires = e.target.desires.value;
		const desiresSplit = desires.split(",");
		const desiresArray = desiresSplit.map((desire) => desire.trim(" "));
		const addDesires = await editSkills(desiresArray, user_id, false);
		const image_url = user.image_url;



		try {
			const response = await Promise.all([
				axios.post(`${api}/users/edituser`, {
					user_id: user_id,
					first_name: first_name,
					last_name: last_name,
					email: email,
					password: password,
					image_url: image_url,
					status: active,
					coords: coords,
					about: about,
					address: address,
					home: home,
					city: city,
					province: province,
				}),
			]);
			// setLoggedIn(true);
			setUser(response[0].data);
			setNeighbors([]);
			console.log(response)
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

	async function editSkills(arr, id, which) {
		try {
			const response = await Promise.all(
				arr.map((item) =>
					axios.post(`${api}/userskills/editskills`, {
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

	// function sayClick() {
	// 	console.log('click')
	// }

	return (
		<div className="edit">
			<h1 className="edit__title">
				Edit your profile and barter on my friend
			</h1>
			{/* <form onSubmit={editUser} method="post" className="edit__form"> */}
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
							onChange={(e)=>setFirstName(capFirst(e.target.value))}
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
							onChange={(e)=>setLastName(capFirst(e.target.value))}
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
							onChange={(e)=>setEmail(e.target.value.toLowerCase())}
						/>
					</label>
					{/* <label className="edit__label">
						Password
						<input
							type="password"
							className="edit__input"
							name="password"
							placeholder="Password"
						/>
					</label>
					<label className="edit__label">
						Confirm
						<input
							type="password"
							className="edit__input"
							name="password_confirm"
							placeholder="Password again"
						/>
					</label> */}
					<label className="edit__label">
						Home Address
						<input
							type="text"
							className="edit__input"
							name="home"
							placeholder="123 Main St"
							value={home}
							onChange={(e)=>setHome(capFirst(e.target.value))}
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
							onChange={(e)=>setCity(capFirst(e.target.value))}
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
							onChange={(e)=>setProvince(capFirst(e.target.value))}
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
							maxLength={300}
							placeholder="Feel free to describe your interests here, and why you're excited to connect with your fellow neighbors."
							value={about}
							onChange={(e)=>setAbout(e.target.value)}
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
							onChange={(e)=>setOffers(capFirst(e.target.value))}
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
							onChange={(e)=>setDesires(capFirst(e.target.value))}
						/>
					</label>
					<p className="edit__desc">
						One or two words for each thing you'd like to barter for, separated by commas
					</p>
					{/* <label className="edit__label">Profile Picture (url only)
                        <input type="text" className="edit__input" name="image" placeholder="https://picsum.photos/200/300?grayscale" value="https://picsum.photos/seed/picsum/300/300"/>
                    </label> */}
					<button className="edit__btn">Edit Your Profile</button>
					{/* <Link className="edit__btn" onClick={()=>navigate(-1)}>Back</Link> */}
				</div>
			</form>
		</div>
	);
}