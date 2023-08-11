import "./LoginPage.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import setToken from "../../utils/setToken";

export default function LoginPage({ setLoggedIn, setUser }) {
	const api = process.env.REACT_APP_API_URL;
	const [userInfoDisplay, setUserInfoDisplay] = useState("");

	//TODO : move validationSchema to separate file
	const validationSchema = Yup.object().shape({
		email: Yup.string().required("Email is required").email("Email is invalid"),
		password: Yup.string()
			.required("Password is required")
			.min(8, "Password must be at least 6 characters")
			.max(20, "Password must not exceed 20 characters")
			.matches(/\d+/, "Password needs a number")
			.matches(/[a-z]+/, "Password needs a lowercase letter")
			.matches(/[A-Z]+/, "Password needs an uppercase letter")
			.matches(/[!@#$%^&*()-+]+/, "Password needs special character"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema,
		// validateOnChange: false,
		// validateOnBlur: false,
		onSubmit: (values) => {
			setUserInfoDisplay("Getting user info...");
			// TODO : make axios call to make sure user exists and if so,
			// then set user token, set isLoggedIn to true, then navigate to neighbors
			const email = values.email;
			const password = values.password;

			// TODO : create ui notice that they are being logged in
			// TODO : create loginUser function in utils to clean up code in LoginPage
			axios
				.post(`${api}/users/login`, { email, password })
				.then((response) => {
					if (response.data.user.email === email) {
						setToken(response.data.token);
						setUser(response.data.user);
						setLoggedIn(true);
					} else {
						setUserInfoDisplay("Error logging in, please try again");
					}
				})
				.catch((error) => {
					console.log("error: ", error);
					// TODO : handle error and update ui accordingly

					if (error.response.status === 404 || error.response.status === 400) {
						setUserInfoDisplay("Invalid User");
					}
					if (error.response.status === 429) {
						setUserInfoDisplay("Please try again later");
					} else {
						console.log("Error getting user");
						setUserInfoDisplay("Error logging in, please try again");
					}
					// setErrorActive(true);
				});
		},
	});

	// if (noToken) {
	return (
		<div className='login__container'>
			<div className='login'>
				<div className='login-info'>
					<div className='login-info__qa'>
						<h2 className='login-info__quest'>Why Helping Neighbors?</h2>
						<p className='login-info__answer'>
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

				<div className='login-info'>
					<div className='login-info__qa'>
						<h2 className='login-info__quest'>Get Involved</h2>
						<p className='login-info__answer'>
							Identify your skills and think about how they can benefit your
							neighbors. For example, if you have experience in gardening, you
							could offer to help your neighbors with their garden or give them
							tips on how to grow their own vegetables. Similarly, if you're
							skilled in carpentry, you could offer to help with repairs or
							build something for a neighbor who needs it.
						</p>
					</div>
				</div>

				<form className='login-form' onSubmit={formik.handleSubmit} noValidate>
					<div className='login-form__group'>
						<label htmlFor='email'> Email </label>
						<input
							name='email'
							type='email'
							className={
								"form-control" +
								(formik.errors.email && formik.touched.email
									? " is-invalid"
									: "")
							}
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
						<div className='invalid-feedback'>
							{formik.errors.email && formik.touched.email
								? formik.errors.email
								: null}
						</div>
					</div>

					<div className='login-form__group'>
						<label htmlFor='password'> Password </label>
						<input
							name='password'
							type='password'
							className={
								"form-control" +
								(formik.errors.password && formik.touched.password
									? " is-invalid"
									: "")
							}
							onChange={formik.handleChange}
							value={formik.values.password}
						/>
						<div className='invalid-feedback'>
							{formik.errors.password && formik.touched.password
								? formik.errors.password
								: null}
						</div>
					</div>

					<div className='login-form__group'>
						<button type='submit' className='login-form__btn'>
							Login
						</button>
						<button
							type='button'
							className='login-form__btn'
							onClick={formik.handleReset}>
							Reset
						</button>
						{userInfoDisplay && <p>{userInfoDisplay}</p>}
					</div>
				</form>
			</div>
		</div>
	);
}
// }

// ================PREVIOUS WORKING VERSION ON AUG 9 2023====================
// import "./LoginPage.scss";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import purify from "../../utils/purify";
// import axios from "axios";
// import validateEmail from "../../utils/validateEmail";
// import validatePassword from "../../utils/validatePassword";

// export default function LoginPage({ setToken, setUser, setLoggedIn }) {
// 	const [errorActive, setErrorActive] = useState(false);
// 	const [errorMessage, setErrorMessage] = useState("");
// 	const api = process.env.REACT_APP_API_URL;

// 	//wakeup server on page load
// 	useEffect(() => {
// 		axios.get(`${api}/users/newemail`);
// 		//eslint-disable-next-line
// 	}, []);

// 	async function handleLogin(loginForm) {
// 		loginForm.preventDefault();

// 		const email = purify(loginForm.target.email.value.toLowerCase());
// 		if (validateEmail(email)) {
// 			setErrorMessage("Invalid email");
// 			setErrorActive(true);
// 			return;
// 		}

// 		const password = purify(loginForm.target.password.value);
// 		if (validatePassword(password)) {
// 			setErrorMessage("Invalid password");
// 			setErrorActive(true);
// 			return;
// 		}

// 		setErrorActive(false);

// 		await axios
// 			.post(`${api}/users/login`, { email, password })
// 			.then((res) => {
// 				if (res.data.user.email === email) {
// 					setToken(res.data.token);
// 					setUser(res.data.user);
// 					setLoggedIn(true);
// 				} else {
// 					setErrorMessage("User not found");
// 					setErrorActive(true);
// 				}
// 			})
// 			.catch((error) => {
// 				if (error.response.status === 404 || error.response.status === 400) {
// 					setErrorMessage("Invalid User");
// 				}
// 				if (error.response.status === 429) {
// 					setErrorMessage("Please try again later");
// 				} else {
// 					console.log("errror getting user");
// 				}
// 				setErrorActive(true);
// 			});
// 	}

// 	return (
// 		<div className="login__container">
// 			<h1 className="login__title">
// 				Sign in or sign up to start bartering your way to a better neighborhood
// 			</h1>
// 			<div className="login">
// 				<div className="login-info">
// 					<div className="login-info__qa">
// 						<h2 className="login-info__quest">Why Helping Neighbors?</h2>
// 						<p className="login-info__answer">
// 							Offering your skills to neighbors can be a great way to connect
// 							with people in your community who need help with something that
// 							you're skilled in. You can also encourage your neighbors to share
// 							their skills and expertise, creating a community where everyone
// 							contributes and benefits. This can not only help your neighbors
// 							but also create a sense of belonging, safety, and mutual support
// 							within your community.
// 						</p>
// 					</div>
// 				</div>

// 				<div className="login-info">
// 					<div className="login-info__qa">
// 						<h2 className="login-info__quest">Get Involved</h2>
// 						<p className="login-info__answer">
// 							Identify your skills and think about how they can benefit your
// 							neighbors. For example, if you have experience in gardening, you
// 							could offer to help your neighbors with their garden or give them
// 							tips on how to grow their own vegetables. Similarly, if you're
// 							skilled in carpentry, you could offer to help with repairs or
// 							build something for a neighbor who needs it.
// 						</p>
// 					</div>
// 				</div>

// 				<div className="login-form">
// 					<form
// 						className="login-form__form"
// 						onSubmit={handleLogin}
// 						method="post"
// 						noValidate
// 					>
// 						<div className="login-form__box">
// 							<p className="login-form__label">Email</p>
// 							<input
// 								type="email"
// 								autoComplete="username"
// 								className="login-form__input"
// 								name="email"
// 								placeholder="your email@something.com"
// 								required
// 							/>
// 							{errorActive && <p className="login-error">{errorMessage}</p>}
// 							<p className="login-form__label">Password</p>
// 							<input
// 								type="password"
// 								autoComplete="current-password"
// 								className="login-form__input"
// 								name="password"
// 							/>
// 						</div>
// 						<div className="login-form__box">
// 							<button className="login-form__btn">Sign In</button>
// 							<Link className="login-form__btn signup" to="/signup">
// 								Sign Up
// 							</Link>
// 						</div>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
