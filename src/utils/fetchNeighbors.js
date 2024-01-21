import { get } from "./api";

export default async function fetchNeighbors() {
	const getNeighbors = await get("users");
	return getNeighbors.data.neighbors;
}
