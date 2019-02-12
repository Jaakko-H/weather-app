import * as statics from '../utils/statics';

function getLocationQueryParams(latitude, longitude) {
  return latitude && longitude ? `?latitude=${latitude}&longitude=${longitude}` : '';
}

export const getForecastFromApi = async (latitude, longitude) => {
  const locationQueryParams = getLocationQueryParams(latitude, longitude);
  try {
    const response = await fetch(`${statics.BASE_URL}/forecast${locationQueryParams}`);
    return response.json();
  } catch (error) {
    return {};
  }
};

export const getWeatherFromApi = async (latitude, longitude) => {
  const locationQueryParams = getLocationQueryParams(latitude, longitude);
  try {
    const response = await fetch(`${statics.BASE_URL}/weather${locationQueryParams}`);
    return response.json();
  } catch (error) {
    return {};
  }
};
