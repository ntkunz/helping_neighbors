import axios from "axios";

/**
 * The base URL of the API.
 * @type {string}
 */
const api = process.env.REACT_APP_API_URL;

/**
 * Sends a GET request to verify the user's token and return the user's data.
 * @return {Promise<object>} The user's data or an error object.
 */
export default async function verifyUser(token) {
	try {
		const response = await axios.get(`${api}/users/verify`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.data && response.data.email) {
			return await response.data;
		} else {
			throw new Error("Invalid response data");
		}
	} catch (error) {
		// Throw an error if the request fails
		throw new Error("Token validation error");
	}
}
