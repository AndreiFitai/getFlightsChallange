const { expect } = require('chai');
const sinon = require('sinon');
const getFlights = require('../../flights/getFlights');
const cache = require('../../cache');
const flights = require('../../flights/flightsDataUtils');

const promiseTimeout = (delay, data) => {
  return new Promise(resolve => setTimeout(resolve, delay, data));
};

describe('flights', () => {
  describe('processApiResponse', () => {
    before(() => {
      sinon.stub(cache, 'getDataOnTimeout');
      sinon.stub(flights, 'getNewFlightsData');
    });
    after(() => {
      sinon.restore();
    });
    it('should return new list of flights if response time < 1000 ms', async () => {
      cache.getDataOnTimeout.returns(promiseTimeout(1000, 'errorData'));
      flights.getNewFlightsData.returns(promiseTimeout(250, 'flightsData'));
      const result = await getFlights();
      expect(result).to.be.equal('flightsData');
    });
    it('should return cached list of flights if response time > 1000 ms', async () => {
      cache.getDataOnTimeout.returns(promiseTimeout(1000, 'errorData'));
      flights.getNewFlightsData.returns(promiseTimeout(1500, 'flightsData'));
      const result = await getFlights();
      expect(result).to.be.deep.equal('errorData');
    });
  });
});
