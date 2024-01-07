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
									setUser={setUser}
									setToken={setToken}
									setLoggedIn={setLoggedIn}
								/>
							)
						}
					/>
					{!loggedIn && (
						<Route
							path='/signup'
							element={
								<NewUserPage
									setUser={setUser}
									setLoggedIn={setLoggedIn}
									setNeighbors={setNeighbors}
									setToken={setToken}
								/>
							}
						/>
					)}
					{loggedIn && (
						<Route
							path='/:id'
							element={<MessagePage user={user} neighbors={neighbors} />}
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
									token={token}
									setToken={setToken}
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
