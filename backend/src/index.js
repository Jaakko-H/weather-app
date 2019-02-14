const weatherMapApi = require('./api/weather-map-api');
const Koa = require('koa');
const router = require('koa-router')();
const cors = require('kcors');

const app = new Koa();
const port = process.env.PORT || 9000;

const attachCityNameIntoForecastEntity = (forecastEntity, cityName) => {
  forecastEntity.name = cityName;
  return forecastEntity;
};

router.get('/api/forecast', async ctx => {
  const queryParams = ctx.request.query;
  const forecastData = await weatherMapApi.fetchForecast(queryParams.latitude, queryParams.longitude);
  const responseBody = forecastData.list ? attachCityNameIntoForecastEntity(forecastData.list[0], forecastData.city.name) : {};

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = responseBody;
});

router.get('/api/weather', async ctx => {
  const queryParams = ctx.request.query;
  const weatherData = await weatherMapApi.fetchWeather(queryParams.latitude, queryParams.longitude);

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData;
});

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
