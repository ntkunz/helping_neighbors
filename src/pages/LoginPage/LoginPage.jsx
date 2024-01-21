import "./LoginPage.scss";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { get, post } from "../../utils/api";
import purify from "../../utils/purify";
import placeToken from "../../utils/placeToken";
import validateEmail from "../../utils/validateEmail";
import {
	passwordLength,
	passwordContainsUppercase,
	passwordContainsLowercase,
	passwordContainsNumber,
	passwordContainsSpecialCharacter
} from "../../utils/validatePassword";

// TODO: Create tested loginFormValidation function
export default function LoginPage({ setToken }) {
	const [errorActive, setErrorActive] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const isEmailValid = useMemo(() => validateEmail(email), [email]);

	const isPasswordEightCharacters = useMemo(() => passwordLength(password), [password]);
	const doesPasswordHaveOneNumber = useMemo(() => passwordContainsNumber(password), [password]);
	const doesPasswordHaveOneSpecialCharacter = useMemo(() => passwordContainsSpecialCharacter(password), [password]);
	const doesPasswordHaveOneUppercase = useMemo(() => passwordContainsUppercase(password), [password]);
	const doesPasswordHaveOneLowercase = useMemo(() => passwordContainsLowercase(password), [password]);

	//wakeup server on page load
	useEffect(() => {
		get(`users/newemail`);
		//eslint-disable-next-line
	}, []);

	async function handleLogin(loginForm) {
		loginForm.preventDefault();

		if (!isEmailValid || !isPasswordEightCharacters || !doesPasswordHaveOneNumber || !doesPasswordHaveOneSpecialCharacter || !doesPasswordHaveOneUppercase || !doesPasswordHaveOneLowercase) {
			setErrorMessage("Please correct your email and password");
			setErrorActive(true);
			return;
		}


		const emailAtLogin = purify(loginForm.target.email.value.toLowerCase());

		const loginData = {
			email: emailAtLogin,
			password: purify(loginForm.target.password.value),
		};

		try {
			const returnedUser = await post(`users/login`, loginData);
			if (returnedUser.data.user.email === emailAtLogin) {
				placeToken(returnedUser.data.token);
				setToken(returnedUser.data.token);
			} else {
				setErrorMessage("User not found");
				setErrorActive(true);
			}
		} catch (error) {
			console.log('login error: ', error)
			setErrorMessage("Invalid User");
			setErrorActive(true);
		}
	}

	return (
		<div className='login__container'>
			<h1 className='login__title'>
				Sign in or sign up to start bartering your way to a better neighborhood
			</h1>
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

				<div className='login-form'>
					<form
						className='login-form__form'
						onSubmit={handleLogin}
						method='post'
						noValidate>
						<div className='login-form__box'>
							<p className='login-form__label'>Email</p>
							<input
								type='email'
								autoComplete='username'
								className='login-form__input'
								name='email'
								placeholder='your email@something.com'
								onChange={(changeEmail) => { setEmail(changeEmail.target.value) }}
								value={email}
							/>
							{errorActive && <p className='login-error'>{errorMessage}</p>}
							<p className='login-form__label'>Password</p>
							<input
								type='password'
								autoComplete='current-password'
								className='login-form__input'
								name='password'
								onChange={(changePassword) => { setPassword(changePassword.target.value) }}
								value={password}
							/>
						</div>
						<div className='login-form__box'>
							<button
								type='submit'
								className='login-form__btn'
								disabled={!isEmailValid ||
									!doesPasswordHaveOneLowercase ||
									!doesPasswordHaveOneUppercase ||
									!doesPasswordHaveOneSpecialCharacter ||
									!doesPasswordHaveOneNumber ||
									!isPasswordEightCharacters
								}
							>Sign In</button>
							<Link className='login-form__btn signup' to='/signup'>
								Sign Up
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
