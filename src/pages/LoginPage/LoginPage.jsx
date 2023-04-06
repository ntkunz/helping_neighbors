import "./LoginPage.scss";

export default function LoginPage({ handleLogin }) {
    return (
        <div className="login">
            <form className="form" onSubmit={handleLogin} method="post">
                <p className="form__label">Email</p>
                <input type="text" className="form__input" name="email" />    
                <p className="form__label">Password</p>
                <input type="password" className="form__input" name="password" />    
                <button className="form__btn">Submit</button>
            </form>
        </div>
    );
}