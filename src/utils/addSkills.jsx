import axios from "axios";
export default async function addSkills(arr, id) {
	const api = process.env.REACT_APP_API_URL;

	try {
		const response = await axios.post(`${api}/userskills`, {
			user_id: id,
			skills: arr,
		});
		return response;
	} catch (error) {
		console.log("Error adding skills");
	}
}
