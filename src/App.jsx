import "./App.scss";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import NewUserPage from "./pages/NewUserPage/NewUserPage";
import EditUserPage from "./pages/EditUserPage/EditUserPage";
import Neighbors from "./pages/Neighbors/Neighbors";
import MessagePage from "./pages/MessagePage/MessagePage";
import MessagersPage from "./pages/MessagersPage/MessagersPage";
import axios from "axios";
import setReturnedUsers from "./utils/setReturnedUsers";
import purify from "./utils/purify";
import setToken from "./utils/setToken";

export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState({});
	const [neighbors, setNeighbors] = useState([]);

	let navigate = useNavigate();

	const api = process.env.REACT_APP_API_URL;

	//use effect to login user if token is present , run on load
	// useEffect(() => {
	// 	//get token on load
	// 	const email = purify(getUserFromToken());
	// 	//if token present, set logged in and user state
	// 	if (email) {
	// 		setNeighbors([]);

	// 		axios.post(`${api}/users`, { email }).then((res) => {
	// 			if (res.data.length > 0) {
	// 				//set user and neighbor states, set token, set logged in
	// 				setReturnedUsers(
	// 					email,
	// 					res.data,
	// 					setNeighbors,
	// 					setLoggedIn,
	// 					setToken,
	// 					setUser
	// 				);
	// 				//navigate to neighbors page
	// 				navigate("/neighbors");
	// 			}
	// 		});
	// 	}
	// 	//eslint-disable-next-line
	// }, []);

	//new function to send jwt to server and see if email is valid and user is logged in
	// useEffect(() => {
	// 	//get token on load
	// 	const token = localStorage.getItem("token");
	// 	console.log('token: ', token)
	// 	//if token present, set logged in and user state
	// 	if (token) {
	// 		//send token to server to see if user is logged in
	// 		axios.post(`${api}/users/verify`, { token }).then((res) => {
	// 			if (res.data.email) {
	// 				console.log(res.data.email)
	// 			}
	// 		})
	// 	} else {
	// 		navigate("/login");
	// 	}
	// }, []);

	//THERE'S SOMETHING STRANGE HERE WHERE IT'S NOT CANCELLING FURTHER REQUESTS TO GET NEIGHBORS
	const sendRequest = async () => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/login");
		} else {
			try {
				const response = await axios.get(`${api}/users/verify`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				// Handle the response

				// AT THIS POINT, THE USER'S EMAIL IS ATTAINED BASED OFF OF THE JWT
				//NOW, WE NEED TO GET THE USER'S DATA FROM THE DATABASE AND THE NEIGHBORS' DATA
				console.log("token response: ", response);
				if (response.data[0].email) {
					return await response.data[0];
				} else return null;
			} catch (error) {
				// Handle the error
				console.log("token validation error");
			}
		}
	};

	// JUNE 8TH ASYNC AWAIT TO GET USER ON LOAD
	useEffect(() => {
		const getUser = async () => {
			const user = await sendRequest();
			if (user && user.email) {
				setUser(user);
			} else {
				navigate("/login");
			}
		};
		getUser();
	}, []);

	//another attempt to send the token to the server on load using authorization header
	//WORKING, BUT NOT ASYNC AWAIT VERSION
	// useEffect(() => {
	// 	const user = sendRequest();
	// 	console.log('user line 104: ', user)
	// 	if (user.email) {
	// 		setUser(user)
	// 	} else {
	// 		navigate("/login");
	// 	}
	// }, []);

	useEffect(() => {
		//fetch neighbors, to be used in useEffect on user state
		const fetchNeighbors = async () => {
			// setLoggedIn(true);
			const getNeighbors = await axios.get(`${api}/users/getneighbors`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			//ADD ERROR HANDLING HERE!

			//return neighbors as response
			console.log("neighbors: ", getNeighbors.data.neighbors);
			setNeighbors(getNeighbors.data.neighbors);
			setLoggedIn(true);
			navigate("/neighbors");
			return getNeighbors.data;
		};

		fetchNeighbors();
	}, [user]);

	//function to get user email from token in local storage
	//dompurified in useEffect that retrieves token
	// const getUserFromToken = () => {
	// 	const tokenValue = localStorage.getItem("token");

	// 	if (tokenValue) {
	// 		const { userToken } = JSON.parse(tokenValue);
	// 		return userToken;
	// 	} else return null;
	// };

	// const getEmailFromToken = (token) => {
	// 	try {
	// 	  // Replace 'yourSecretKey' with your own secret key for verifying the token
	// 	  const decoded = jwt.verify(token, 'yourSecretKey');
	// 	  return decoded.email;
	// 	} catch (err) {
	// 	  console.error('Error decoding token:', err);
	// 	  return null;
	// 	}
	//  };

	//handle login and set user state
	async function handleLogin(e) {
		e.preventDefault();
		// errorElement ready if server returns an error
		const errorElement = document.querySelector(".error");
		//set email user signed in with
		const email = purify(e.target.email.value.toLowerCase());

		// regex to check for valid email input
		const emailRegex = /\S+@\S+\.\S+/;
		if (!emailRegex.test(email)) {
			//display error if email not valid
			errorElement.textContent = "Please enter a valid email";
			errorElement.style.display = "inline-block";
			return;
		}

		const password = purify(e.target.password.value);

		//regex to check for valid password
		// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		// if (!passwordRegex.test(password)) {
		// 	//display error if password not valid
		// 	errorElement.textContent =
		// 		"Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number";
		// 	errorElement.style.display = "inline-block";
		// 	return;
		// }

		//remove error if user has corrected input
		document.querySelector(".error").style.display = "none";

		//api call to return user with matching email and all neighbors
		//api call to login user, not to return all neighbors yet
		await axios
			// .post(`${api}/users`, { email, password })
			.post(`${api}/users/login`, { email, password })
			.then((res) => {
				console.log("res: ", res.data.user);
				// await axios.post(`${api}/users`, { email, password }).then((res) => {
				// if (res.data.length > 0) {
				//ADDED POTATO TO TEST/DISABLE THOSE STATE CHANGES
				if (res.data.user.email === email) {
					//set token in local storage
					setToken(res.data.token);
					//set user
					setUser(res.data.user);
					//set neighbors
					//DISABLED BELOW TO TEST
					// setNeighbors(res.data.neighbors);

					//set user and neighbor states, set token, set logged in
					// setReturnedUsers(email, res.data, setNeighbors, setLoggedIn, setToken, setUser);

					//set loggedIn to true
					// setLoggedIn(true);

					//navigate to neighbors page
					// navigate("/neighbors");
				} else {
					// error if no user found
					errorElement.style.display = "inline-block";
					errorElement.textContent = "User not found";
				}
			})
			.catch((error) => {
				//set error text based on error status
				// console.log(error.response.status)
				if (error.response.status === 404)
					errorElement.textContent = "Invalid User";
				if (error.response.status === 429)
					errorElement.textContent = "Please try again later";
				// //display error element
				errorElement.style.display = "inline-block";
			});
	}

	//handle logout and clear user state
	function handleLogout(e) {
		e.preventDefault();
		if (loggedIn) {
			setLoggedIn(!loggedIn);
			setUser({});
			localStorage.removeItem("token");
			return navigate("/login");
		} else {
			return navigate("/login");
		}
	}

	return (
		<div className="App">
			<Header loggedIn={loggedIn} handleLogout={handleLogout} />
			<div className="App__routes">
				<Routes>
					<Route
						path="/"
						element={
							loggedIn ? <Navigate to="/neighbors" /> : <Navigate to="/login" />
							// <Neighbors loggedIn={loggedIn} />
						}
					/>
					<Route
						path="/neighbors"
						element={
							loggedIn ? (
								<Neighbors
									loggedIn={loggedIn}
									user={user}
									neighbors={neighbors}
								/>
							) : (
								<Navigate to="/login" />
							)
						}
					/>
					<Route
						path="/login"
						element={
							<LoginPage
								loggedIn={loggedIn}
								setUser={setUser}
								handleLogin={handleLogin}
								handleLogout={handleLogout}
							/>
						}
					/>
					<Route
						path="/profile"
						element={
							loggedIn ? (
								<EditUserPage
									user={user}
									setNeighbors={setNeighbors}
									setUser={setUser}
									setToken={setToken}
									setLoggedIn={setLoggedIn}
								/>
							) : (
								<Navigate to="/login" />
							)
						}
					/>
					<Route
						path="/signup"
						element={
							<NewUserPage
								setUser={setUser}
								setLoggedIn={setLoggedIn}
								setNeighbors={setNeighbors}
								setToken={setToken}
							/>
						}
					/>
					<Route
						path="/neighbor/:id"
						element={<MessagePage user={user} neighbors={neighbors} />}
					/>
					<Route
						path="/neighbor"
						element={<MessagersPage user={user} neighbors={neighbors} />}
					/>
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}
