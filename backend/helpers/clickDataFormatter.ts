interface clickData {
	clickTimestamp: Date;
	clickCity: string;
	clickCountry: string;
}

// Too lazy to type geoData
const clickDataFormatter = (geoData: any): clickData => {
	const cityName = geoData.city.name;
	const stateName = geoData.state.name;
	const countryName = geoData.name;
	const continentCode = geoData.continent.code;

	const clickTimestamp = new Date();
	const clickCity = `${cityName}, ${stateName}`;
	const clickCountry = `${countryName}, ${continentCode}`;

	return {
		clickTimestamp,
		clickCity,
		clickCountry,
	};
};

export default clickDataFormatter;
