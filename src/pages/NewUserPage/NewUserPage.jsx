import "./NewUserPage.scss";
import { v4 } from "uuid";
import axios from "axios";
export default function NewUserPage() {

const api = process.env.REACT_APP_API_URL;
// const hereKey = process.env.HERE_API_KEY;
// console.log(process.env.HERE_API_KEY);
// console.log(`here key: ${hereKey}`)

function createNewUser(e) {
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
    const status = 'active';
    const location = getNewUserGeo(addressRequest);
    console.log(`location: ${location}`)
    const about = e.target.about.value;
    // axios.post(`${api}/users/newuser`, {first_name, last_name, password, password_confirm, location, email, about})
    // .then((res) => {
    //     console.log(res.data);
    // })
}

//BREAK address DOWN WORD BY WORD INTO AN ARRAY OF STRINGS THEN INPUT EACH STRING INTO A VARIABLE JOINED WITH + AND THEN USE THAT VARIABLE IN THE API CALL
function getNewUserGeo(addressRequest) {

    axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${addressRequest}&apiKey=2xyyJfskb70knqfTQ_avt7TgW3QSCDdByI3ntsBGKAk`)
    // axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${addressRequest}&apiKey=${hereKey}`)
    .then((res) => {
        // console.log(res.data.items[0].position.lng);
        // const latLng = `${res.data.items[0].position.lng},${res.data.items[0].position.lat}`;
        // return latLng;
        return `${res.data.items[0].position.lng},${res.data.items[0].position.lat}`;
    })
    }

// function handleLogin(e) {
//     e.preventDefault();
//     const email = e.target.email.value;
//     axios.post(`${api}/users`, {email})
//       .then((res) => {
//         setLoggedIn(loggedIn);
//         setUser(res.data);
//         navigate('/neighbors');
//       })
//   }





    return (
        <div className="new">
            <form onSubmit={createNewUser} method="post" className="new__form">
                <label className="new__label"> First Name
                    <input type="text" className="new__input" name="first_name" />
                </label>
                <label className="new__label">Last Name
                    <input type="text" className="new__input" name="last_name" />
                </label>
                <label className="new__label">Your Email
                    <input type="text" className="new__input" name="email" />
                </label>
                <label className="new__label">Password
                    <input type="password" className="new__input" name="password" />
                </label>
                <label className="new__label">Confirm Password
                    <input type="password" className="new__input" name="password_confirm" />
                </label>
                {/* <label className="new__label">Address
                    <input type="text" className="new__input" name="address" />
                </label> */}
                <label className="new__label">House Number
                    <input type="text" className="new__input" name="house" />
                </label>
                <label className="new__label">Street Name
                    <input type="text" className="new__input" name="street" />
                </label>
                <label className="new__label">City
                    <input type="text" className="new__input" name="city" />
                </label>
                <label className="new__label">State or Province
                    <input type="text" className="new__input" name="province" />
                </label>
                <label className="new__label">Country
                    <input type="text" className="new__input" name="country" />
                </label>
                <label className="new__label">Profile Picture (url only)
                    <input type="text" className="new__input" name="image" />
                </label>
                <label className="new__label">Tell your neighbors about yourself
                    <input type="textarea" className="new__input textarea" name="about" />
                </label>
                <button calssName="new__btn">Start Meeting Your Neighborhs</button>
            </form>
        </div>
    )
}