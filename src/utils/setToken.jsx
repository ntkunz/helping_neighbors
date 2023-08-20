export default function setToken(userToken) {
	const tokenValue = JSON.stringify({ userToken });
	localStorage.setItem("token", tokenValue);
}
