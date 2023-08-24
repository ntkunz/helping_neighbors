import axios from "axios";
export default async function removeSkills(id) {
	const api = process.env.REACT_APP_API_URL;

	try {
		const response = await axios.delete(`${api}/userskills/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return response;
	} catch (error) {
		console.log("Error removing skills barters, please try again.");
	}
}
