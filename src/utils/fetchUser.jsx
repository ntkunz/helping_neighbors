import axios from "axios";

const api = process.env.REACT_APP_API_URL;

export default async function fetchUser() {
	const token = localStorage.getItem("token");

	if (!token) {
		throw new Error("User not authenticated");
	} else {
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
			throw new Error("Token validation error");
		}
	}
}
