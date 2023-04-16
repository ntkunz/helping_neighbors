import "./Header.scss";
import { NavLink } from "react-router-dom";

export default function Header({ loggedIn, handleLogout }) {
	// const navigate = useNavigate();

	return (
		<header className="header">
			<div className="header__container">
				<div className="header__titlebox">
					<NavLink to="/" className="header__title-btn">
						<h1 className="header__title">Helping</h1>
						<h2 className="header__subtitle">Neighbors</h2>
					</NavLink>
				</div>

				<div className="header__tagline-box">
					<p className="header__tagline">-Barter skills</p>
					<p className="header__tagline">-Build community</p>
				</div>

				<div className="header__navbox">
					{loggedIn ? (
						<NavLink to="/neighbors" className="header__btn">
							Meet Your Neighbors
						</NavLink>
					) : (
						<NavLink to="/login" className="header__btn">
							Meet Your Neighbors
						</NavLink>
					)}
					{loggedIn ? (
						<NavLink to="/neighbor" className="header__btn">
							Messages
						</NavLink>
					) : (
						<NavLink to="/signup" className="header__btn">
							Messages
						</NavLink>
					)}
					{loggedIn ? (
						<NavLink to="/profile" className="header__btn">
							Profile
						</NavLink>
					) : (
						<NavLink to="/signup" className="header__btn">
							Profile
						</NavLink>
					)}
					{loggedIn ? (
						<button onClick={handleLogout} className="header__btn fixed">
							Logout
						</button>
					) : (
						<button
							onClick={handleLogout}
							className="header__btn fixed loggedin"
						>
							Login
						</button>
					)}
				</div>
			</div>
		</header>
	);
}
