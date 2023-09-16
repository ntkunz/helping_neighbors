import "./Header.scss";
import HeaderLoggedOut from "./Headers/HeaderLoggedOut";
import HeaderLoggedIn from "./Headers/HeaderLoggedIn";

export default function Header({
	loggedIn,
	setLoggedIn,
	setUser,
	setNeighbors,
	setToken,
}) {
	if (!loggedIn) {
		return <HeaderLoggedOut />;
	}
	return (
		<HeaderLoggedIn
			setLoggedIn={setLoggedIn}
			setUser={setUser}
			setNeighbors={setNeighbors}
			setToken={setToken}
		/>
	);
}
