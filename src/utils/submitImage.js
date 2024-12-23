import { makeApiCall } from './api';

export default async function submitImage(userId, userToken, imageFile) {
	let formData = new FormData();
	formData.append("file", imageFile);
	formData.append("userId", userId);
	// const imagesSubmitted = await post("users/image", formData);
	const imagesSubmitted = await makeApiCall("POST", "users/image", formData, true);
	return imagesSubmitted;
}
