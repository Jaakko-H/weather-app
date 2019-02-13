// ES5 style imports required by Mocha
const assert = require('chai').assert;
const index = require('../src/index');
const nock = require('nock');

describe('index', function(){

  beforeEach(async () =>{
  });

	it('#fetchForecast should return response json', async () => {

    const expectedResponse = { list: 'mockList' };

    nock(index.mapURI)
    .get('/forecast?appid=&lat=1&lon=2')
    .reply(200, { list: 'mockList' });

    const response = await index.fetchForecast(1, 2);

    assert.strictEqual(response.list, expectedResponse.list);
  });
})