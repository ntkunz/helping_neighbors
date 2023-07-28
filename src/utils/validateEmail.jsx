export default function validateEmail(email) {
	return (
		email.length < 6 ||
		email.length > 50 ||
		email.indexOf("@") === -1 ||
		email.indexOf(".") === -1
	);
}
