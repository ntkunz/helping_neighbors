import axios from "axios";
const geoApi = process.env.REACT_APP_GEO_URL;
const geoKey = process.env.REACT_APP_HERE_API_KEY;

/**
 * Given an address, returns its latitude and longitude using an external API
 * @param {string} addressRequest - The address to be geocoded
 * @returns {Promise<[number, number]>} - A promise that resolves to a tuple containing the longitude and latitude of the given address
 */
export default async function getNewUserGeo(addressRequest) {
	try {
		const res = await axios.get(
			// API endpoint for getting the latitude and longitude of an address
			`${geoApi}?q=${addressRequest}&apiKey=${geoKey}`
		);
		// return the longitude and latitude of the address
		return [res.data.items[0].position.lng, res.data.items[0].position.lat];
	} catch (err) {
		// log an error if there is an issue with the API request
		console.log("Error returning lat long from api ", err);
	}
}
