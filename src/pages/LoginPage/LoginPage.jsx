import "./LoginPage.scss";

export default function LoginPage({loggedIn, handleLoggedIn}) {
    return (
        <div className="login">
            <div className="form">
                <p className="form__label">Email</p>
                <input type="text" className="form__input" />    
                <p className="form__label">Password</p>
                <input type="password" className="form__input" />    
                <button className="form__btn" onClick={handleLoggedIn}>Submit</button>
            </div>
        </div>
    );
}