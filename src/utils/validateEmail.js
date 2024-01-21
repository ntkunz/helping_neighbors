export default function validateEmail(email) {
	return email.length >= 5 && email.includes('@') && email.includes('.');
}