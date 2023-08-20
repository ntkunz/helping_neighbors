import axios from "axios";

export default async function fetchNeighbors() {
	const api = process.env.REACT_APP_API_URL;

	//send token to database to get all neighbors for logged in user
	const getNeighbors = await axios.get(`${api}/users`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});

	return getNeighbors.data.neighbors;
}
