import { post } from './api';

export default async function submitImage(userId, userToken, imageFile) {
	let formData = new FormData();
	formData.append("file", imageFile);
	formData.append("userId", userId);
	const imagesSubmitted = await post("users/image", formData);
	return imagesSubmitted;
}
