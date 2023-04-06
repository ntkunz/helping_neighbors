import "./NewUserPage.scss";
import { v4 } from "uuid";
export default function NewUserPage() {

const api = process.env.REACT_APP_API_URL;

function createNewUser(e) {
    e.preventDefault();


    const address = e.target.address.value;
    getNewUserGeo(address);



    const user_id = v4();
    const first_name = e.target.first_name.value;
    const last_name = e.target.last_name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // const password_confirm = e.target.password_confirm.value;
    const image_url = e.target.image.value;

    const status = active;
    const location = e.target.location.value;
    const about = e.target.about.value;
    axios.post(`${api}/users/newuser`, {first_name, last_name, password, password_confirm, location, email, about})
    .then((res) => {
        console.log(res.data);
    })
}

//BREAK ADDRESS DOWN WORD BY WORD INTO AN ARRAY OF STRINGS THEN INPUT EACH STRING INTO A VARIABLE JOINED WITH + AND THEN USE THAT VARIABLE IN THE API CALL
function getNewUserGeo(address) {
    axios.get('https://geocode.search.hereapi.com/v1/geocode?q=1165+e+pender+Vancouver&apiKey=2xyyJfskb70knqfTQ_avt7TgW3QSCDdByI3ntsBGKAk')
    .then((res) => {
        console.log(res.data);
    })
    }

function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    axios.post(`${api}/users`, {email})
      .then((res) => {
        setLoggedIn(loggedIn);
        setUser(res.data);
        navigate('/neighbors');
      })
  }





    return (
        <div className="new">
            <form onSubmit={createNewUser} method="post" className="new__form">
                <label className="new__label"> First Name
                    <input type="text" className="new__input" name="first_name" />
                </label>
                <label className="new__label">Last Name
                    <input type="text" className="new__input" name="last_name" />
                </label>
                <label className="new__label">Password
                    <input type="password" className="new__input" name="password" />
                </label>
                <label className="new__label">Confirm Password
                    <input type="password" className="new__input" name="password_confirm" />
                </label>
                <label className="new__label">Location
                    <input type="text" className="new__input" name="location" />
                </label>
                <label className="new__label">Your Email
                    <input type="text" className="new__input" name="email" />
                </label>
                <label className="new__label">Tell your neighbors about yourself
                    <input type="text" className="new__input" name="about" />
                </label>
            </form>
        </div>
    )
}