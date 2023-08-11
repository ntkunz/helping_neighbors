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
import setToken from "./utils/setToken";
import fetchUser from "./utils/fetchUser";
import fetchNeighbors from "./utils/fetchNeighbors";

export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState({});
	const [neighbors, setNeighbors] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		//TODO: move getUser function to utils folder??????
		//TODO: refactor for readability, removing at least one layer
		const token = localStorage.getItem("token");
		if (token) {
			const getUser = async () => {
				try {
					const user = await fetchUser();
					setUser(user);
				} catch (error) {
					navigate("/login");
				}
			};
			getUser();
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		//TODO: move getNeighbors function to utils folder?????
		if (user.email) {
			const getNeighbors = async () => {
				const neighbors = await fetchNeighbors();
				setNeighbors(neighbors);
				setLoggedIn(true);
				navigate("/neighbors");
			};
			getNeighbors();
		}
		// eslint-disable-next-line
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

	if (!loggedIn) {
		return (
			<div className='App'>
				<h1 className='broken__header'>Site currently under maintenance</h1>
				<h3 className='broken__subheader'>
					Please check back soon... Thank you
				</h3>
			</div>
		);
	}

	// if (!loggedIn) {
	// 	return (
	// 		<div className='App'>
	// 			<Header
	// 				loggedIn={loggedIn}
	// 				handleLogout={handleLogout}
	// 				user={user}
	// 				setUser={setUser}
	// 			/>
	// 			<div className='App__routes'>
	// 				<Routes>
	// 					<Route
	// 						path='/login'
	// 						element={
	// 							<LoginPage
	// 								setUser={setUser}
	// 								setToken={setToken}
	// 								setLoggedIn={setLoggedIn}
	// 							/>
	// 						}
	// 					/>

	// 					<Route
	// 						path='/signup'
	// 						element={
	// 							<NewUserPage
	// 								setUser={setUser}
	// 								setLoggedIn={setLoggedIn}
	// 								setNeighbors={setNeighbors}
	// 								setToken={setToken}
	// 							/>
	// 						}
	// 					/>
	// 					<Route path='*' element={<Navigate to='/login' />} />
	// 				</Routes>
	// 			</div>
	// 			<Footer />
	// 		</div>
	// 	);
	// }

	return (
		<div className='App'>
			<Header loggedIn={loggedIn} handleLogout={handleLogout} />
			<div className='App__routes'>
				<Routes>
					<Route path='/' element={<Navigate to='/neighbors' />} />
					<Route
						path='/neighbors'
						element={
							<Neighbors
								loggedIn={loggedIn}
								user={user}
								neighbors={neighbors}
							/>
						}
					/>
					<Route
						path='/login'
						element={<LoginPage setUser={setUser} setToken={setToken} />}
					/>
					<Route
						path='/profile'
						element={
							<EditUserPage
								user={user}
								setNeighbors={setNeighbors}
								setUser={setUser}
								setToken={setToken}
								setLoggedIn={setLoggedIn}
							/>
						}
					/>
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
					<Route
						path='/neighbor/:id'
						element={<MessagePage user={user} neighbors={neighbors} />}
					/>
					<Route
						path='/neighbor'
						element={<MessagersPage user={user} neighbors={neighbors} />}
					/>
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}
