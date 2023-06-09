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

/**
 * Sends a GET request to verify the user's token and return the user's data.
 * @return {Promise<object>} The user's data or an error object.
 */
export default async function sendRequest() {
	// Get the user's token from local storage
	const token = localStorage.getItem("token");

	// If the token is not found, throw an error
	if (!token) {
		throw new Error("User not authenticated");
	} else {
		try {
			// Send the GET request to verify the token
			const response = await axios.get(`${api}/users/verify`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			// Handle the response
			if (response.data[0] && response.data[0].email) {
				// If the response data is valid, return it
				return await response.data[0];
			} else {
				// If the response data is invalid, throw an error
				throw new Error("Invalid response data");
			}
		} catch (error) {
			// Throw an error if the request fails
			throw new Error("Token validation error");
		}
	}
}

// export default async function sendRequest() {
// 	// Get the user's token from local storage
// 	const token = localStorage.getItem("token");

// 	// If the token is not found, return an error object
// 	if (!token) {
// 		return { error: "User not authenticated" };
// 	} else {
// 		try {
// 			// Send the GET request to verify the token
// 			const response = await axios.get(`${api}/users/verify`, {
// 				headers: {
// 					"Content-Type": "application/json",
// 					Authorization: `Bearer ${token}`,
// 				},
// 			});

// 			// Handle the response
// 			if (response.data[0] && response.data[0].email) {
// 				// If the response data is valid, return it
// 				return await response.data[0];
// 			} else {
// 				// If the response data is invalid, return an error object
// 				return { error: "Invalid response data" };
// 			}
// 		} catch (error) {
// 			// Handle the error
// 			console.log("token validation error");
// 			return { error: "Token validation error" };
// 		}
// 	}
// }
