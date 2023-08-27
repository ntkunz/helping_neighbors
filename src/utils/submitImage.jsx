import axios from "axios";
const api = process.env.REACT_APP_API_URL;

export default async function submitImage(userId, userToken, imageFile) {
	let formData = new FormData();
	// formData.append("file", img.data);
	formData.append("file", imageFile);
	formData.append("userId", userId);
	const response = await axios.post(`${api}/users/image`, formData, {
		headers: {
			Authorization: `Bearer {"userToken":"${userToken}"}`,
			"Content-Type": "multipart/form-data",
		},
	});
	return response;
}
