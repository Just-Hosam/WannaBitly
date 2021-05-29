"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Too lazy to type geoData
const clickDataFormatter = (geoData) => {
    const cityName = geoData.city.name;
    const stateName = geoData.state.name;
    const countryName = geoData.country.name;
    const continentCode = geoData.continent.code;
    const clickCity = `${cityName}, ${stateName}`;
    const clickCountry = `${countryName}, ${continentCode}`;
    const clickTimestamp = new Date();
    const hours = clickTimestamp.getHours();
    const tempMin = clickTimestamp.getMinutes();
    const minutes = tempMin < 10 ? `0${tempMin}` : tempMin;
    const clickTime = `${hours}:${minutes}`;
    const days = clickTimestamp.getDate();
    const months = 1 + clickTimestamp.getMonth();
    const years = clickTimestamp.getFullYear();
    const clickDate = `${days}/${months}/${years}`;
    return {
        clickTime,
        clickDate,
        clickCity,
        clickCountry,
    };
};
exports.default = clickDataFormatter;
