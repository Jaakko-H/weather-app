const fetch = require('node-fetch');

const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

const fetchForecast = async (latitude, longitude) => {
  const locationQueryParams = getLocationQueryParams(latitude, longitude);
  const endpoint = `${mapURI}/forecast?appid=${appId}${locationQueryParams}`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

const fetchWeather = async (latitude, longitude) => {
  const locationQueryParams = getLocationQueryParams(latitude, longitude);
  const endpoint = `${mapURI}/weather?appid=${appId}${locationQueryParams}`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

function getLocationQueryParams(latitude, longitude) {
  return latitude && longitude ? `&lat=${latitude}&lon=${longitude}` : `&q=${targetCity}`;
};

module.exports.appId = appId;
module.exports.mapURI = mapURI;
module.exports.targetCity = targetCity;
module.exports.fetchForecast = fetchForecast;
module.exports.fetchWeather = fetchWeather;
module.exports.getLocationQueryParams = getLocationQueryParams;
