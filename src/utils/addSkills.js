// import axios from "axios";
import { post } from "./api";
export default async function addSkills(arr, id) {
	
	const skillsData = {
		user_id: id,
		skills: arr,
	};

	try {
		await post(`userskills`, skillsData)
		return true;
	} catch (error) {
		console.log("Error adding skills");
		return false;
	}
}
