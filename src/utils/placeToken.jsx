export default function placeToken(userToken) {
	const tokenValue = JSON.stringify({ userToken });
	localStorage.setItem("token", tokenValue);
}
