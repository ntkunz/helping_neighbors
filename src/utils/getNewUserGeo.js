const geoApi = process.env.REACT_APP_GEO_URL;
const geoKey = process.env.REACT_APP_HERE_API_KEY;

export default async function getNewUserGeo(addressRequest) {
	const response = await fetch(`${geoApi}?q=${addressRequest}&apiKey=${geoKey}`, {
	  method: "GET"
	});
	if (!response.ok) {
	  throw new Error(response.statusText);
	}
	const data = await response.json();
	return [data.items[0].position.lng, data.items[0].position.lat];
  }
