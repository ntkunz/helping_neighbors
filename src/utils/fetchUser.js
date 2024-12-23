import { get } from "./api";
import { makeApiCall } from "./api";

// export default async function fetchUser() {
// 	return await get("users/verify");
// }

export default async function fetchUser() {
	return await makeApiCall("GET", "users/verify", null, true);
}