import axios from "axios";
const geoApi = process.env.REACT_APP_GEO_URL;
const geoKey = process.env.REACT_APP_HERE_API_KEY;

export default async function getNewUserGeo(addressRequest) {
	try {
		const res = await axios.get(
			`${geoApi}?q=${addressRequest}&apiKey=${geoKey}`
		);
		return [res.data.items[0].position.lng, res.data.items[0].position.lat];
	} catch (error) {
		// TODO: Add error handling
		console.log("Error returning lat long from api");
		return null;
	}
}
