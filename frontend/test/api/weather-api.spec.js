// ES5 style imports required by Mocha
const assert = require('chai').assert;
const weatherApi = require('../../src/api/weather-api');
const nock = require('nock');
const statics = require('../../src/utils/statics');

describe('weatherApi', () => {
  afterEach((done) => {
    nock.cleanAll();
    nock.disableNetConnect();
    done();
  });

  it('#getForecastFromApi should return response json', async () => {
    const expectedResponse = { list: 'mockList' };

    nock(statics.BASE_URL)
      .get('/forecast?latitude=1&longitude=2')
      .reply(200, expectedResponse);

    const response = await weatherApi.getForecastFromApi(1, 2);

    assert.hasAnyKeys(response, 'list');
  });

  it('#fetchWeather should return response json', async () => {
    const expectedResponse = { list: 'mockList' };

    nock(statics.BASE_URL)
      .get('/weather?latitude=1&longitude=2')
      .reply(200, expectedResponse);

    const response = await weatherApi.getWeatherFromApi(1, 2);

    assert.hasAnyKeys(response, 'list');
  });

  it(
    '#getLocationQueryParams should return query param string ' +
      'with latitude and longitude when passed defined values',
    async () => {
      const expectedResponse = '?latitude=1&longitude=2';

      const response = weatherApi.getLocationQueryParams(1, 2);

      assert.strictEqual(response, expectedResponse);
    }
  );

  it(
    '#getLocationQueryParams should return empty string ' +
      'when passed undefined values',
    () => {
      const expectedResponse = '';

      const response = weatherApi.getLocationQueryParams(undefined, undefined);

      assert.strictEqual(response, expectedResponse);
    }
  );
});
