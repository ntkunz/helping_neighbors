import "./NewUserPage.scss";
import { v4 } from "uuid";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function NewUserPage({
	setUser,
	setLoggedIn,
	setUserEmail,
	setNeighbors,
}) {
	const navigate = useNavigate();

	const api = process.env.REACT_APP_API_URL;
	const geoKey = process.env.REACT_APP_HERE_API_KEY;
	const geoApi = process.env.REACT_APP_GEO_URL;

	const [image, setImage] = useState({});

	function capFirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// async function createNewUser(e) {
	// 	e.preventDefault();
	// 	const user_id = v4();
	// 	const first_name = capFirst(e.target.first_name.value);
	// 	const last_name = capFirst(e.target.last_name.value);
	// 	const email = e.target.email.value.toLowerCase();
	// 	const password = e.target.password.value;
	// 	// const password_confirm = e.target.password_confirm.value;
	// 	const image_url = "https://picsum.photos/300";
	// 	const home = capFirst(e.target.home.value);
	// 	const city = capFirst(e.target.city.value);
	// 	const province = capFirst(e.target.province.value);
	// 	const address = `${home} ${city} ${province}`;
	// 	const addressRequest = address
	// 		.replaceAll(",", " ")
	// 		.replaceAll(" ", "+")
	// 		.replaceAll(".", "+");
	// 	const coords = await getNewUserGeo(addressRequest); // wait for the coordinates
	// 	const status = "active";
	// 	const about = e.target.about.value;
	// 	const offers = e.target.offers.value;
	// 	const offersSplit = offers.split(",");
	// 	const offersArray = offersSplit.map((offer) => offer.trim(" "));
	// 	const addOffers = await addSkills(offersArray, user_id, true);
	// 	const desires = e.target.desires.value;
	// 	const desiresSplit = desires.split(",");
	// 	const desiresArray = desiresSplit.map((desire) => desire.trim(" "));
	// 	const addDesires = await addSkills(desiresArray, user_id, false);
	// 	try {
	// 		const response = await Promise.all([
	// 			axios.post(`${api}/users/newuser`, {
	// 				user_id: user_id,
	// 				first_name: first_name,
	// 				last_name: last_name,
	// 				email: email,
	// 				password: password,
	// 				image_url: image_url,
	// 				image: image,
	// 				status: status,
	// 				coords: coords,
	// 				about: about,
	// 				address: address,
	// 				home: home,
	// 				city: city,
	// 				province: province,
	// 			}),
	// 		]);

	// 		//working on image upload	
	// 		submitImage(image, response[0].data.user_id);
	// 		setLoggedIn(true);
	// 		setUserEmail(email);
	// 		console.log("New user created: ", response[0].data);
	// 		setUser(response[0].data);
	// 		navigate("/neighbors");
	// 	} catch (err) {
	// 		console.log("Error creating new user: ", err);
	// 	}
	// }


	//api call to return lat long from address


function createNewUser(e) {
	e.preventDefault();
	console.log('image: ', image);
}
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


	//-----------------------ALL IMAGE TINKERING BELOW THIS LINE-----------------------
	async function imageChange(e) {
		const image = e.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			setImage(reader.result);
			console.log('reader.result: ', reader.result);
			// const imageRead = reader.readAsDataURL(image);
		};
		// console.log('reader: ', reader.readAsDataURL(image));
		// console.log('image; ', image);
		// const imageRead = reader.readAsDataURL(image);
		// console.log('imageRead: ', imageRead);
		// setImage(imageRead);
	}




	// async function submitImage(img, id) {
	// 	try {
	// 		const response = await
	// 				axios.post(`${api}/users/image`, {
	// 					user_id: id,
	// 					image: img
	// 				})
	// 		return response;
	// 	} catch (err) {
	// 		console.log("Error submit Image: ", err);
	// 	}
	// }

		const [statusResponse, setStatusResponse] = useState('')
		const [img , setImg] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()
		let formData = new FormData()
		formData.append('file', img.data)
		formData.append("user_id", `8a075c14-dd19-48c1-b931-aab8bf66ad52`)
		console.log('formData: ', img)
		const response = await axios.post(`${api}/users/image`, formData)
		if (response) setStatusResponse(response.statusText)
	  }
	
	  const handleFileChange = (e) => {
		const img = {
		  preview: URL.createObjectURL(e.target.files[0]),
		  data: e.target.files[0],
		}
		console.log('img: ', img)
		setImg(img)
	  }
	



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
							maxLength={300}
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
					{/* <label className="new__label">Profile Picture (url only)
                        <input type="text" className="new__input" name="image" placeholder="https://picsum.photos/200/300?grayscale" value="https://picsum.photos/seed/picsum/300/300"/>
                    </label> */}
					<button className="new__btn">Start Meeting Your Neighbors</button>
				</div>
			</form>

{/* add image form goes here!!! */}
<form onSubmit={handleSubmit}>
        <input type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Submit</button>
      </form>
	  <img src={img} alt='' />

		</div>
	);
}


// {/* <form encType="urlencoded" method="post" onChange={imageChange}>
// <div className="form-group">
// 	<input type="file" className="form-control-file" name="uploaded_file" />
// 	{/* <input
// 		type="text"
// 		class="form-control"
// 		placeholder="Number of speakers"
// 		name="nspeakers"
// 	/> */}
// 	<input
// 		type="submit"
// 		value="Upload Profile Photo"
// 		className="btn btn-default"
// 	/>
// </div>
// </form> */}



// <form onChange={imageChange}>
// <div className="form-group">
// 	<input type="file" className="form-control-file" name="uploaded_file" />
// 	{/* <input
// 		type="text"
// 		class="form-control"
// 		placeholder="Number of speakers"
// 		name="nspeakers"
// 	/> */}
// 	<input
// 		type="submit"
// 		value="Upload Profile Photo"
// 		className="btn btn-default"
// 	/>
// </div>
// </form>