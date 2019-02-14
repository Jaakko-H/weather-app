// ES5 style imports required by Mocha
const assert = require('chai').assert;
const weatherMapApi = require('../src/api/weather-map-api');
const nock = require('nock');

describe('weatherMapApi', function(){

  afterEach(function (done) {
    nock.cleanAll();
    nock.disableNetConnect();
    done();
  });

	it('#fetchForecast should return response json', async () => {

    const expectedResponse = { list: 'mockList' };

    nock(weatherMapApi.mapURI)
    .get('/forecast?appid=&lat=1&lon=2')
    .reply(200, expectedResponse);

    const response = await weatherMapApi.fetchForecast(1, 2);

    assert.hasAnyKeys(response, 'list');
  });

  it('#fetchWeather should return response json', async () => {

    const expectedResponse = { list: 'mockList' };

    nock(weatherMapApi.mapURI)
    .get('/weather?appid=&lat=1&lon=2')
    .reply(200, expectedResponse);

    const response = await weatherMapApi.fetchWeather(1, 2);

    assert.hasAnyKeys(response, 'list');
  });

  it('#getLocationQueryParams should return query param string '
      + 'with latitude and longitude when passed defined values', async () => {

    const expectedResponse = '&lat=1&lon=2';

    const response = weatherMapApi.getLocationQueryParams(1, 2);

    assert.strictEqual(response, expectedResponse);
  });

  it('#getLocationQueryParams should return query param string '
      + 'with default target city when passed undefined values', () => {

    const expectedResponse = '&q=Helsinki,fi';

    const response = weatherMapApi.getLocationQueryParams(undefined, undefined);

    assert.strictEqual(response, expectedResponse);
  });
})