import "../Header.scss";
import { Link, NavLink } from "react-router-dom";

export default function HeaderLoggedOut() {
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
					<NavLink to='/signup' className='header__btn'>
						Sign Up
					</NavLink>

					{/* <NavLink to="/login" className="header__btn"> */}
					<NavLink to='/' className='header__btn'>
						Login
					</NavLink>
				</div>
			</div>
		</header>
	);
}
