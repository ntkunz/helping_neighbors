import { get } from "./api";

export default async function fetchUser() {
	const userData = await get("users/verify");
	return userData.data;
}
