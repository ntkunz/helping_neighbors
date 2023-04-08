import "./NewUserPage.scss";
import { v4 } from "uuid";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function NewUserPage({ setUser, setLoggedIn }) {

const navigate = useNavigate();

const api = process.env.REACT_APP_API_URL;
const hereKey = process.env.HERE_API_KEY;
// console.log(process.env.HERE_API_KEY);
console.log(`here key: ${hereKey}`)

async function createNewUser(e) {
    e.preventDefault();
    const user_id = v4();
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password_confirm = e.target.password_confirm.value;
    const image_url = e.target.image.value;
    const house = e.target.house.value;
    const street = e.target.street.value;
    const city = e.target.city.value;
    const province = e.target.province.value;
    const country = e.target.country.value;
    const address = `${house} ${street} ${city} ${province} ${country}`;
    const addressRequest = address.replaceAll(",", ' ').replaceAll(" ", '+').replaceAll(".", '+');
    const coords = await getNewUserGeo(addressRequest); // wait for the coordinates
    const status = 'active';
    const about = e.target.about.value;
    axios.post(`${api}/users/newuser`, {
            user_id: user_id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            image_url: image_url,
            status: status,
            coords: coords,
            about: about,
            address: address,
    })
    .then((res) => {
        setLoggedIn(true);
        setUser(res.data);
        navigate('/neighbors');
    })
    .catch((err) => {
        console.log('Error creating new user: ', err);
    });
}



//api call to return lat long from address
async function getNewUserGeo(addressRequest) {
    try {
        const res = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${addressRequest}&apiKey=2xyyJfskb70knqfTQ_avt7TgW3QSCDdByI3ntsBGKAk`);
        // console.log(res.data.items[0].position.lng);
        // const latLng = `POINT(${res.data.items[0].position.lng},${res.data.items[0].position.lat})`;
        const latLng = [res.data.items[0].position.lng, res.data.items[0].position.lat];
        // console.log(latLng);
        return latLng;
        // return `${res.data.items[0].position.lng},${res.data.items[0].position.lat}`;
    } catch(err) {
        console.log('Error returning lat long from api ', err)
    }
}



    return (
        <div className="new">
            <h1 className="new__title">Sign up to start bartering your way to a better neighborhood</h1>
            <form onSubmit={createNewUser} method="post" className="new__form">
                <div className="new__signup">
                <label className="new__label"> First Name
                    <input type="text" className="new__input" name="first_name" placeholder="First name" />
                </label>
                <label className="new__label">Last Name
                    <input type="text" className="new__input" name="last_name" placeholder="Last name" />
                </label>
                <label className="new__label">Your Email
                    <input type="text" className="new__input" name="email" placeholder="your email@something.com" />
                </label>
                <label className="new__label">Password
                    <input type="password" className="new__input" name="password" placeholder="Password"/>
                </label>
                <label className="new__label">Confirm Password
                    <input type="password" className="new__input" name="password_confirm" placeholder="Password again"/>
                </label>
                <label className="new__label">Address
                    <input type="text" className="new__input" name="address" placeholder="123 Main St, Any Town, BC, Canada"/>
                </label>
                <p className="new__desc">Please include house number, city, and state/province</p>
                {/* <label className="new__label">House Number
                    <input type="text" className="new__input" name="house" />
                </label>
                <label className="new__label">Street Name
                    <input type="text" className="new__input" name="street" />
                </label>
                <label className="new__label">City
                    <input type="text" className="new__input" name="city" />
                </label>
                <label className="new__label">State/Province
                    <input type="text" className="new__input" name="province" />
                </label>
                <label className="new__label">Country
                    <input type="text" className="new__input" name="country" />
                </label> */}
                </div>

                <div className="new__personalize">
                <label className="new__label">Tell your neighbors about yourself
                    <textarea className="new__input textarea" name="about" rows="3" maxLength={300} resize="none" placeholder="Feel free to describe your interests here, and why you're excited to connect with your fellow neighbors."/>
                </label>
                <label className="new__label">Skills you can offer
                    <input type="text" className="new__input" name="skills" placeholder="ie Gardening, Landscaping, Construction"/>
                </label>
                <p className="new__desc">One or two words for each offering, separated by commas</p>
                <label className="new__label">What you would like to barter for
                    <input type="text" className="new__input" name="skills" placeholder="ie Cooking, Running Errands, Cat Sitting"/>
                </label>
                <p className="new__desc">One or two words for each offering, separated by commas</p>
                <label className="new__label">Profile Picture (url only)
                    <input type="text" className="new__input" name="image" placeholder="https://www.awebsite.com/images/myprofilepicure.png"/>
                </label>
                <button className="new__btn">Start Meeting Your Neighbors</button>
                </div>
                
            </form>
        </div>
    )
}