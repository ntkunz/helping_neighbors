import "./LoginPage.scss";
import { Link } from "react-router-dom";

export default function LoginPage({ handleLogin }) {
	return (
		<div className="login__container">
			<h1 className="login__title">
				Sign in or sign up to start bartering your way to a better neighborhood
			</h1>
			<div className="login">
				<div className="login-info">
					<div className="login-info__qa">
						<h2 className="login-info__quest">Why Helping Neighbors?</h2>
						<p className="login-info__answer">
							Offering your skills to neighbors can be a great way to connect
							with people in your community who need help with something that
							you're skilled in. You can also encourage your neighbors to share
							their skills and expertise, creating a community where everyone
							contributes and benefits. This can not only help your neighbors
							but also create a sense of belonging, safety, and mutual support
							within your community.
						</p>
					</div>
				</div>

				<div className="login-info">
					<div className="login-info__qa">
						<h2 className="login-info__quest">Get Involved</h2>
						<p className="login-info__answer">
							Identify your skills and think about how they can benefit your
							neighbors. For example, if you have experience in gardening, you
							could offer to help your neighbors with their garden or give them
							tips on how to grow their own vegetables. Similarly, if you're
							skilled in carpentry, you could offer to help with repairs or
							build something for a neighbor who needs it.
						</p>
					</div>
				</div>

				<div className="login-form">
					<form className="login-form__form" onSubmit={handleLogin} method="post">
					<div className="login-form__box">
						<p className="login-form__label">Email</p>
						<input
							type="email"
							autocomplete="username"
							className="login-form__input"
							name="email"
							placeholder="your email@something.com"
							required
						/>
						<p className="error">Email not found</p>
						<p className="login-form__label">Password</p>
						<input
							type="password"
							autocomplete="current-password"
							className="login-form__input"
							name="password"
						/>
					</div>
					<div className="login-form__box">
						<button className="login-form__btn">Sign In</button>
						<Link className="login-form__btn signup" to="/signup">
							Sign Up
						</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
