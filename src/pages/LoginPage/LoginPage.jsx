import "./LoginPage.scss";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import purify from "../../utils/purify";
import axios from "axios";
import placeToken from "../../utils/placeToken";
import validateEmail from "../../utils/validateEmail";

// TODO: Create tested loginFormValidation function
export default function LoginPage({ setToken }) {
	const [errorActive, setErrorActive] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const api = process.env.REACT_APP_API_URL;

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const isEmailValid = useMemo(() => validateEmail(email), [email]);

	const isPasswordEightCharacters = useMemo(() => password.length >= 8, [password]);
	const doesPasswordHaveOneNumber = useMemo(() => /\d/.test(password), [password]);
	const doesPasswordHaveOneSpecialCharacter = useMemo(() => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password), [password]);
	const doesPasswordHaveOneUppercase = useMemo(() => /[A-Z]+/.test(password), [password]);
	const doesPasswordHaveOneLowercase = useMemo(() => /[a-z]+/.test(password), [password]);

	//wakeup server on page load
	useEffect(() => {
		axios.get(`${api}/users/newemail`);
		//eslint-disable-next-line
	}, []);

	async function handleLogin(loginForm) {
		loginForm.preventDefault();

		if (!isEmailValid || !isPasswordEightCharacters || !doesPasswordHaveOneNumber || !doesPasswordHaveOneSpecialCharacter || !doesPasswordHaveOneUppercase || !doesPasswordHaveOneLowercase) {
			return;
		}

		const email = purify(loginForm.target.email.value.toLowerCase());

		const password = purify(loginForm.target.password.value);

		setErrorActive(false);

		await axios
			.post(`${api}/users/login`, { email, password })
			.then((res) => {
				if (res.data.user.email === email) {
					placeToken(res.data.token);
					setToken(res.data.token);
				} else {
					setErrorMessage("User not found");
					setErrorActive(true);
				}
			})
			.catch((error) => {
				setErrorMessage("Invalid User");
				setErrorActive(true);
			});
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
							<p className={`login-form__valid-label ${!isEmailValid ? 'login-form__valid-label--active' : ''}`}>Valid Email</p>
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
							<p className={`login-form__valid-label ${!isPasswordEightCharacters ? 'login-form__valid-label--active' : ''}`}>At least 8 characters</p>
							<p className={`login-form__valid-label ${!doesPasswordHaveOneNumber ? 'login-form__valid-label--active' : ''}`}>At least one number</p>
							<p className={`login-form__valid-label ${!doesPasswordHaveOneSpecialCharacter ? 'login-form__valid-label--active' : ''}`}>At least one special character</p>
							<p className={`login-form__valid-label ${!doesPasswordHaveOneUppercase ? 'login-form__valid-label--active' : ''}`}>At least one uppercase letter</p>
							<p className={`login-form__valid-label ${!doesPasswordHaveOneLowercase ? 'login-form__valid-label--active' : ''}`}>At least one lowercase letter</p>

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
