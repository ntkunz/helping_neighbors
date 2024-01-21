export function passwordLength(password) {
	return password.length > 7 && password.length < 42;
}

export function passwordContainsNumber(password) {
	return /\d/.test(password);
}

export function passwordContainsSpecialCharacter(password) {
	return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
}

export function passwordContainsUppercase(password) {
	return /[A-Z]+/.test(password);
}

export function passwordContainsLowercase(password) {
	return /[a-z]+/.test(password);
}

export function passwordsMatch(password, passwordConfirm) {
	return password === passwordConfirm;
}
