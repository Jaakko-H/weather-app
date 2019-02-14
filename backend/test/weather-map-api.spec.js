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
})