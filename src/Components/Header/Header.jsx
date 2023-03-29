import './Header.scss';
import { NavLink, Link } from "react-router-dom";
// import headerImg from "../assets/images/headerImg";

export default function Header() {

    return(

    <header className="header">
        <Link to="/dashboard"><img className="header__img" src={headerImg} alt="Helping Neighbors Logo" /></Link>
        <div className="header__buttons">
            {/* make this navlink either login or logout depending on userState */}
            {/* <NavLink to="/warehouses" className={({ isActive }) => 
                isActive ? "header__warehouse-button--active" : "header__warehouse-button"
                }><h3 className="header__button">Warehouses</h3></NavLink>
            <NavLink to="/inventory" className={({ isActive }) => 
                isActive ? "header__inventory-button--active" : "header__inventory-button"
                }><h3 className="header__button">Inventory</h3></NavLink> */}
            
            <h1 className="Header__text">Helping Neighbors</h1>
            {/* <NavLink to="/login" className="header__btn">Logout</NavLink> */}
            <NavLink className="header__btn">Logout</NavLink>
            {/* <NavLink to="/dashboard" className="header__btn">Login</NavLink> */}
            <NavLink className="header__btn">Login</NavLink>
            {/* <NavLink to="/dashboard" className="header__btn">Home</NavLink> */}
            <NavLink className="header__btn">Home</NavLink>
            {/* <NavLink to="/messages" className="header__btn">Messages</NavLink> */}
            <NavLink className="header__btn">Messages</NavLink>
            {/* <NavLink to="/neighbors" className="header__btn">Neighbors</NavLink> */}
            <NavLink className="header__btn">Neighbors</NavLink>
            {/* <NavLink to="/profile" className="header__btn">Profile</NavLink> */}
            <NavLink className="header__btn">Profile</NavLink>
        </div>
    </header>
    )
}
