import * as statics from '../utils/statics';

export const getForecastFromApi = async () => {
  try {
    const response = await fetch(`${statics.BASE_URL}/forecast`);
    return response.json();
  } catch (error) {
    return {};
  }
};

export const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${statics.BASE_URL}/weather`);
    return response.json();
  } catch (error) {
    return {};
  }
};
