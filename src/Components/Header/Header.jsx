import "./Header.scss";
import { NavLink } from "react-router-dom";
import HeaderLoggedOut from "./Headers/HeaderLoggedOut";
import HeaderLoggedIn from "./Headers/HeaderLoggedIn";

export default function Header({ loggedIn, handleLogout }) {
	if (!loggedIn) {
		return <HeaderLoggedOut />;
	}

	return <HeaderLoggedIn handleLogout={handleLogout} />;
}
