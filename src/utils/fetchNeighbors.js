import { get } from "./api";
import { makeApiCall } from "./api";

export default async function fetchNeighbors() {
	// const neighbors = await get("users");
	// return neighbors.neighbors;
	return await makeApiCall("GET", "users/neighbors", null, true);
}
