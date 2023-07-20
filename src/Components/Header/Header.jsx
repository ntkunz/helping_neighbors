import "./Header.scss";
import HeaderLoggedOut from "./Headers/HeaderLoggedOut";
import HeaderLoggedIn from "./Headers/HeaderLoggedIn";

export default function Header({ loggedIn, handleLogout }) {
	if (!loggedIn) {
		return <HeaderLoggedOut />;
	}
	return <HeaderLoggedIn handleLogout={handleLogout} />;
}
