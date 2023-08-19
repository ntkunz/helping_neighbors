import "./Header.scss";
import HeaderLoggedOut from "./Headers/HeaderLoggedOut";
import HeaderLoggedIn from "./Headers/HeaderLoggedIn";

export default function Header({
	loggedIn,
	setLoggedIn,
	setUser,
	setNeighbors,
}) {
	if (!loggedIn) {
		return <HeaderLoggedOut />;
	}
	return (
		<HeaderLoggedIn
			setLoggedIn={setLoggedIn}
			setUser={setUser}
			setNeighbors={setNeighbors}
		/>
	);
}
