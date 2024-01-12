import "./App.scss";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginPage from "./pages/LoginPage/LoginPage";
import NewUserPage from "./pages/NewUserPage/NewUserPage";
import EditUserPage from "./pages/EditUserPage/EditUserPage";
import Neighbors from "./pages/Neighbors/Neighbors";
import MessagePage from "./pages/MessagePage/MessagePage";
import placeToken from "./utils/placeToken";
import fetchUser from "./utils/fetchUser";
import fetchNeighbors from "./utils/fetchNeighbors";
import { socket } from "./socket";

export default function App() {
	const [isLoaded, setIsLoaded] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState({});
	const [neighbors, setNeighbors] = useState([]);
	const storageToken = localStorage.getItem("token");
	const [token, setToken] = useState(storageToken);
	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			if (!storageToken) placeToken(token);
			fetchUser()
				.then((user) => setUser(user))
				.then(() => fetchNeighbors())
				.then((neighbors) => setNeighbors(neighbors))
				.then(() => {
					setIsLoaded(true);
					setLoggedIn(true);
					navigate("/");
				})
				.catch(() => localStorage.removeItem("token"));
		} else {
			setToken(null);
			setIsLoaded(true);
		}
		// eslint-disable-next-line
	}, [storageToken, token]);

	useEffect(() => {
		loggedIn && socket.connect();
		socket.on("connect", () => {
			console.log("connected");
		});
		return () => {
			if (socket.connected) {
				socket.disconnect();
				socket.off("connect");
				socket.off("sendMessageToApi");
			}
		}
	}, [loggedIn]);

	if (!isLoaded) return null;

	return (
		<div className='App'>
			<Header
				loggedIn={loggedIn}
				setLoggedIn={setLoggedIn}
				setUser={setUser}
				setNeighbors={setNeighbors}
				setToken={setToken}
			/>
			<div className='App__routes'>
				<Routes>
					<Route
						path='/'
						element={
							loggedIn ? (
								<Neighbors
									loggedIn={loggedIn}
									setLoggedIn={setLoggedIn}
									user={user}
									neighbors={neighbors}
									setNeighbors={setNeighbors}
								/>
							) : (
								<LoginPage
									setToken={setToken}
								/>
							)
						}
					/>
					{!loggedIn && (
						<Route
							path='/signup'
							element={
								<NewUserPage
									setToken={setToken}
								/>
							}
						/>
					)}
					{loggedIn && (
						<Route
							path='/:id'
							element={<MessagePage user={user} neighbors={neighbors}
								socket={socket}
							/>}
						/>
					)}
					{loggedIn && (
						<Route
							path='/profile'
							element={
								<EditUserPage
									user={user}
									setNeighbors={setNeighbors}
									setUser={setUser}
									setLoggedIn={setLoggedIn}
								/>
							}
						/>
					)}
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}
