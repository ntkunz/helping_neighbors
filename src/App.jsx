import "./App.scss";
import { useState, useEffect } from "react";
import {
	Routes,
	Route,
	useParams,
	Navigate,
	useNavigate,
} from "react-router-dom";
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
	const id = useParams();

	const api = process.env.REACT_APP_API_URL;

	useEffect(() => {
		getNeighbors(user.location);
		navigate("/neighbors");
	}, [user, userEmail]);

	//handle login and set user state
	async function handleLogin(e) {
		e.preventDefault();
		const email = e.target.email.value;
		await axios.post(`${api}/users`, { email }).then((res) => {
			if (res.data.length > 0) {
			setLoggedIn(true);
			setUser(res.data[0]);
			setUserEmail(res.data[0].email);
			} else {
				alert("Email not found. Please try again or register.");
			}
		});
	}

	//handle logout and clear user state
	function handleLogout(e) {
		e.preventDefault();
		if (loggedIn) {
			setLoggedIn(!loggedIn);
			setUser({});
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
									getNeighbors={getNeighbors}
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
