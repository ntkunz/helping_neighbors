export default function validatePassword(password) {
	return (
		password.length < 7 ||
		password.length > 28 ||
		password.search(/[0-9]/) < 0 ||
		password.search(/[a-z]/i) < 0 ||
		password.search(/[A-Z]/) < 0 ||
		password.search(/.*[!@#$%^&*() =+_-]/)
	);
}
