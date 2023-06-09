import axios from "axios";

/**
 * Fetches neighbors from the API and sets them as state.
 * @returns {Promise<Object>} The data returned by the API.
 */
export default async function fetchNeighbors() {

   const api = process.env.REACT_APP_API_URL;

   //send token to database to get all neighbors for logged in user
	const getNeighbors = await axios.get(`${api}/users/getneighbors`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});

	// Return neighbors
	return getNeighbors.data.neighbors;
}
