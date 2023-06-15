import "./App.scss";
import axios from "axios";
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
import purify from "./utils/purify";
import setToken from "./utils/setToken";
import sendRequest from "./utils/sendRequest";
import fetchNeighbors from "./utils/fetchNeighbors";

export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState({});
	const [neighbors, setNeighbors] = useState([]);

	let navigate = useNavigate();

	const api = process.env.REACT_APP_API_URL;
	
	/**
	 * This effect runs once on component mount and updates the state with the user's data
	 * or redirects to the login page if the user is not authenticated
	 */
	useEffect(() => {
		const getUser = async () => {
			try {
				const user = await sendRequest();
				setUser(user);
			} catch (error) {
				navigate("/login");
			}
		};
		getUser();
	}, []);

	// This effect runs whenever user is ChannelMergerNode, it gets the user's neighbors and udpates the neighbors state
	useEffect(() => {
		const fetchData = async () => {
			//run fetchNeighbors function to get the neighbors with token
			const neighbors = await fetchNeighbors();
			// set the neighbors, logged in, and navigate to /neighbors page
			setNeighbors(neighbors);
			setLoggedIn(true);
			navigate("/neighbors");
		};

		// Check if user object has an email property and if so fetch neighbors
		if ("email" in user) {
			fetchData();
		}
	}, [user]);

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

		// regex to check for valid password
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])?[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
		if (!passwordRegex.test(password)) {
			//display error if password not valid
			errorElement.textContent =
				"Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number";
			errorElement.style.display = "inline-block";
			return;
		}

		//remove error if user has corrected input
		document.querySelector(".error").style.display = "none";

		//api call to login user, not to return all neighbors yet
		await axios
			// .post(`${api}/users`, { email, password })
			.post(`${api}/users/login`, { email, password })
			.then((res) => {
				
				if (res.data.user.email === email) {
					//set token in local storage
					setToken(res.data.token);
					//set user
					setUser(res.data.user);
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
