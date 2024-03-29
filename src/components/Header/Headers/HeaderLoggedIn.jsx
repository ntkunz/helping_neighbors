import "../Header.scss";
import { Link, NavLink } from "react-router-dom";

export default function HeaderLoggedIn({
	setLoggedIn,
	setUser,
	setNeighbors,
	setToken,
}) {
	function handleLogout(logoutEvent) {
		logoutEvent.preventDefault();
		localStorage.removeItem("token");
		setNeighbors([]);
		setLoggedIn(false);
		setUser({});
		setToken(null);
	}

	return (
		<header className='header'>
			<div className='header__container'>
				<div className='header__titlebox'>
					<Link to='/' className='header__title-btn'>
						<h1 className='header__title'>Helping</h1>
						<h2 className='header__subtitle'>Neighbors</h2>
					</Link>
				</div>

				<div className='header__tagline-box'>
					<p className='header__tagline'>-Barter skills</p>
					<p className='header__tagline'>-Build community</p>
				</div>

				<div className='header__navbox'>
					{/* <NavLink to='/neighbors' className='header__btn'> */}
					<NavLink to='/' className='header__btn'>
						Your Neighbors
					</NavLink>

					{/* TODO: Add alerts for new messages then re-introduce this */}
					{/* <NavLink to="/neighbor" className="header__btn">
						Messages
					</NavLink> */}

					<NavLink to='/profile' className='header__btn'>
						Profile
					</NavLink>

					<button onClick={handleLogout} className='header__btn fixed'>
						Logout
					</button>
				</div>
			</div>
		</header>
	);
}
