import './Header.scss';
import { useNavigate, NavLink } from "react-router-dom";


export default function Header( { loggedIn, handleLogout } ) {

    const navigate = useNavigate();


    return(

<header className="header">
    <div className="header__container">
        <div className="header__titlebox">
            <NavLink to="/" className="header__title-btn">
                <h1 className="header__title">Helping</h1>
                <h2 className="header__subtitle">Neighbors</h2>
            </NavLink>
        </div>

        <div className="header__navbox">
            {/* <NavLink to="/messages" className="header__btn">Messages</NavLink> */}
            <NavLink to="/neighbors" className="header__btn">Explore Your Neighborhood</NavLink>
            <NavLink to="/profile" className="header__btn">Profile</NavLink>
            {loggedIn ? <button onClick={handleLogout} className="header__btn fixed">Logout</button> : <button onClick={(handleLogout)} className="header__btn fixed">Login</button>}
            {/* <NavLink to="/login" className="header__btn fixed">Login</NavLink> */}
        </div>

        {/* <div className="header__loginbox">
            {loggedIn ? <button onClick={(handleLoggedIn)} className="header__btn">Logout</button> : <button onClick={(handleLoggedIn)} className="header__btn">Login</button>}
        </div> */}
    </div>
</header>
    )
}











