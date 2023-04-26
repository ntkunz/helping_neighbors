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

export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState({});
	const [userEmail, setUserEmail] = useState([]);
	const [neighbors, setNeighbors] = useState([]);

	let navigate = useNavigate();

	const api = process.env.REACT_APP_API_URL;

	//use effect to login user if token is present , run on load
	useEffect(() => {
		const email = getUserFromToken();
		if (email) {
			axios.post(`${api}/users`, { email }).then((res) => {
				if (res.data.length > 0) {
					setLoggedIn(true);
					setToken(res.data[0].email);
					setUser(res.data[0]);
					setUserEmail(res.data[0].email);
				} else {
					// alert("Email not found. Please try again or register.");
				}
			});
		}
		//eslint-disable-next-line
	}, []);

	//use effect to get neighbors and navigate to neighbors page once user and userEmail are set
	useEffect(() => {
		// getNeighbors(user.location);

		console.log("user after getNeighbors", user);

		// navigate("/neighbors");
		//eslint-disable-next-line
	}, [user, userEmail]);

	//function to set token in local storage
	function setToken(email) {
		const tokenValue = JSON.stringify({ email });
		localStorage.setItem("token", tokenValue);
	}

	//function to get user email from token in local storage
	const getUserFromToken = () => {
		const tokenValue = localStorage.getItem("token");
		if (tokenValue) {
			const { email } = JSON.parse(tokenValue);
			return email;
		}
		return null;
	};

	//handle login and set user state
	async function handleLogin(e) {
		e.preventDefault();
		//set eail user signed in with
		const email = e.target.email.value;
		if (email === "") {
			//display error if no email entered
			document.querySelector(".error").style.display = "inline-block";
			return;
		}

		//remove error if email not emply
		document.querySelector(".error").style.display = "none";

		//api call to return user with matching email and all neighbors
		await axios.post(`${api}/users`, { email }).then((res) => {
			if (res.data.length > 0) {
				//if user found, separate user and neighbors
				const loggedInUser = res.data.find((user) => user.email === email);
				const onlyNeighbors = res.data.filter(
					(neighbor) => neighbor.email !== userEmail
				);

				//set neighbors state
				setNeighbors(onlyNeighbors);
				//set logged in
				setLoggedIn(true);
				//place a token for logged in user
				setToken(loggedInUser.email);
				//set user state
				setUser(loggedInUser);
				//MAY BE ABLE TO REMOVE BELOW STATE AS I THINK IT'S REDUNDANT
				// setUserEmail(loggedInUser.email);
				//navigate to neighbors page
				navigate("/neighbors");
			} else {
				// error if no user found
				document.querySelector(".error").style.display = "inline-block";
			}
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

	//get neighbor's location within 1/2 km, filter out user, and set state
	function getNeighbors(location) {
		axios
			.put(`${api}/users`, { userLocation: location })
			.then((response) => {
				console.log("response in getNeighbors call", response.data);
				const onlyNeighbors = response.data.filter(
					(neighbor) => neighbor.email !== userEmail
				);
				setNeighbors(onlyNeighbors);
			})
			.catch((error) => {
				console.log("error", error);
			});
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
						}
					/>
					<Route
						path="/neighbors"
						element={
							loggedIn ? (
								<Neighbors
									loggedIn={loggedIn}
									user={user}
									// getNeighbors={getNeighbors}
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
									setUser={setUser}
									setNeighbors={setNeighbors}
									handleLogin={handleLogin}
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
								setUserEmail={setUserEmail}
								setNeighbors={setNeighbors}
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
