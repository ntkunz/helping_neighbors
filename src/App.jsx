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
import setToken from "./utils/setToken";
import sendRequest from "./utils/sendRequest";
import fetchNeighbors from "./utils/fetchNeighbors";

export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState({});
	const [neighbors, setNeighbors] = useState([]);
	const navigate = useNavigate();

	//TODO: only run getUser if token exists
	useEffect(() => {
		//TODO: move getUser function to utils folder??????
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

	useEffect(() => {
		//TODO: move getNeighbors function to utils folder?????
		const getNeighbors = async () => {
			const neighbors = await fetchNeighbors();
			setNeighbors(neighbors);
			setLoggedIn(true);
			navigate("/neighbors");
		};

		if (user.email) {
			getNeighbors();
		}
	}, [user]);

	//TODO : move handleLogout to header page?
	function handleLogout(logoutEvent) {
		logoutEvent.preventDefault();
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
								setUser={setUser}
								setToken={setToken}
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
