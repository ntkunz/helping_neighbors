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
	const [neighbors, setNeighbors] = useState([]);

	let navigate = useNavigate();

	const api = process.env.REACT_APP_API_URL;

	//use effect to login user if token is present , run on load
	useEffect(() => {
		//get token on load
		const email = getUserFromToken();
		//if token present, set logged in and user state
		if (email) {
			setNeighbors([]);

			axios.post(`${api}/users`, { email }).then((res) => {
				if (res.data.length > 0) {
					const loggedInUser = res.data.find((user) => user.email === email);
					const onlyNeighbors = res.data.filter(
						(neighbor) => neighbor.email !== loggedInUser.email
					);
					//set neighbors state
					setNeighbors(onlyNeighbors);
					//set logged in
					setLoggedIn(true);
					//set user state
					setUser(loggedInUser);
					//navigate to neighbors page
				navigate("/neighbors");
			}
			});
		}
		//eslint-disable-next-line
	}, []);

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
		//set email user signed in with
		const email = e.target.email.value.toLowerCase();
		console.log('email', email)
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
					(neighbor) => neighbor.email !== loggedInUser.email
				);
				//set neighbors state
				setNeighbors(onlyNeighbors);
				//set logged in
				setLoggedIn(true);
				//place a token for logged in user
				setToken(loggedInUser.email);
				//set user state
				setUser(loggedInUser);
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
