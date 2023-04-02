import './Header.scss';
import { useState } from "react";
import { NavLink, Link, Navigate } from "react-router-dom";
// import headerImg from "../assets/images/headerImg";


export default function Header( { loggedIn, handleLoggedIn } ) {

    const [ messagePage , setMessagePage ] = useState(false);
    const [ neighborsPage , setNeighborsPage ] = useState(false);
    const [ profilePage , setProfilePage ] = useState(false);

    function toggleActive(e) {
        e.preventDefault();
        setMessagePage(!messagePage);
        setNeighborsPage(!neighborsPage);
        setProfilePage(!profilePage);
    }


    return(

<header className="header">
    <div className="header__container">
        <div className="header__titlebox">
            <NavLink to="/dashboard" className="header__title-btn">
                <h1 className="header__title">Helping</h1>
                <h2 className="header__subtitle">Neighbors</h2>
            </NavLink>
        </div>

        <div className="header__navbox">
            <NavLink to="/messages" className="header__btn">Messages</NavLink>
            <NavLink to="/neighbors" className="header__btn">Explore Your Neighborhood</NavLink>
            <NavLink to="/profile" className="header__btn">Profile</NavLink>
            {loggedIn ? <button onClick={(handleLoggedIn)} className="header__btn">Logout</button> : <button onClick={(handleLoggedIn)} className="header__btn">Login</button>}
        </div>

        {/* <div className="header__loginbox">
            {loggedIn ? <button onClick={(handleLoggedIn)} className="header__btn">Logout</button> : <button onClick={(handleLoggedIn)} className="header__btn">Login</button>}
        </div> */}
    </div>
</header>
    )
}












// export default function Header() {

//     return(

//     <header className="container">
//         {/* <Link to="/dashboard"><img className="header__img" src={headerImg} alt="Helping Neighbors Logo" /></Link> */}
//         <h1 className="header__title">Helping Neighbors</h1>

//         <div className="header__buttons">
//             {/* make this navlink either login or logout depending on userState */}
//             {/* <NavLink to="/warehouses" className={({ isActive }) => 
//                 isActive ? "header__warehouse-button--active" : "header__warehouse-button"
//                 }><h3 className="header__button">Warehouses</h3></NavLink>
//             <NavLink to="/inventory" className={({ isActive }) => 
//                 isActive ? "header__inventory-button--active" : "header__inventory-button"
//                 }><h3 className="header__button">Inventory</h3></NavLink> */}
            
//             {/* <NavLink to="/login" className="header__btn">Logout</NavLink> */}
//             {/* <NavLink className="header__btn">Logout</NavLink> */}
//             {/* <NavLink to="/dashboard" className="header__btn">Login</NavLink> */}
//             {/* <NavLink className="header__btn">Login</NavLink> */}
//             {/* <NavLink to="/dashboard" className="header__btn">Home</NavLink> */}
//             <NavLink className="header__btn">Home</NavLink>
//             {/* <NavLink to="/messages" className="header__btn">Messages</NavLink> */}
//             <NavLink className="header__btn">Messages</NavLink>
//             {/* <NavLink to="/neighbors" className="header__btn">Neighbors</NavLink> */}
//             <NavLink className="header__btn">Neighbors</NavLink>
//             {/* <NavLink to="/profile" className="header__btn">Profile</NavLink> */}
//             <NavLink className="header__btn">Profile</NavLink>
//         </div>
//     </header>
//     )
// }
