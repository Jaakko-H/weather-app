const fetch = require('node-fetch');

export const appId = process.env.APPID || '';
export const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
export const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

export const fetchForecast = async (latitude, longitude) => {
  const locationQueryParams = getLocationQueryParams(latitude, longitude);
  const endpoint = `${mapURI}/forecast?appid=${appId}${locationQueryParams}`;
  console.debug('endpoint: ', endpoint);
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

export const fetchWeather = async (latitude, longitude) => {
  const locationQueryParams = getLocationQueryParams(latitude, longitude);
  const endpoint = `${mapURI}/weather?appid=${appId}${locationQueryParams}`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

export function getLocationQueryParams(latitude, longitude) {
  return latitude && longitude ? `&lat=${latitude}&lon=${longitude}` : `&q=${targetCity}`;
};
