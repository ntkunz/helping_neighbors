import "../Header.scss";
import { NavLink } from "react-router-dom";

export default function HeaderLoggedIn({ handleLogout }) {
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
					<NavLink to="/neighbors" className="header__btn">
						Your Neighbors
					</NavLink>

					{/* TODO: Add alerts for new messages then re-introduce this */}
					{/* <NavLink to="/neighbor" className="header__btn">
						Messages
					</NavLink> */}

					<NavLink to="/profile" className="header__btn">
						Profile
					</NavLink>

					<button onClick={handleLogout} className="header__btn fixed">
						Logout
					</button>
				</div>
			</div>
		</header>
	);
}
