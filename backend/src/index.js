const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

export const appId = process.env.APPID || '';
export const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
export const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

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

export const getLocationQueryParams = (latitude, longitude) => {
  return latitude && longitude ? `&lat=${latitude}&lon=${longitude}` : `&q=${targetCity}`;
};

export const attachCityNameIntoForecastEntity = (forecastEntity, cityName) => {
  forecastEntity.name = cityName;
  return forecastEntity;
};

router.get('/api/forecast', async ctx => {
  const queryParams = ctx.request.query;
  const forecastData = await fetchForecast(queryParams.latitude, queryParams.longitude);
  const responseBody = forecastData.list ? attachCityNameIntoForecastEntity(forecastData.list[0], forecastData.city.name) : {};

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = responseBody;
});

router.get('/api/weather', async ctx => {
  const queryParams = ctx.request.query;
  const weatherData = await fetchWeather(queryParams.latitude, queryParams.longitude);

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
