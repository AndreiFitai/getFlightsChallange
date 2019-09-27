const { expect } = require('chai');
const sinon = require('sinon');
const getFlights = require('../../flights/getFlights');
const cache = require('../../cache');
const flights = require('../../flights');

const promiseTimeout = (delay, data) => {
  return new Promise(resolve => setTimeout(resolve, delay, data));
};

describe('flights', () => {
  describe('processApiResponse', () => {
    const getDataOnTimeoutStub = sinon.stub(cache, 'getDataOnTimeout');
    const getNewFlightsDataStub = sinon.stub(flights, 'getNewFlightsData');
    it('should return new list of flights if response time < 1000 ms', async () => {
      getDataOnTimeoutStub.returns(promiseTimeout(1000, 'error'));
      getNewFlightsDataStub.returns(promiseTimeout(250, 'flights'));
      const result = await getFlights();
      expect(result).to.be.equal('flights');
    });
    it('should return cached list of flights if response time > 1000 ms', async () => {
      getDataOnTimeoutStub.returns(promiseTimeout(1000, 'error'));
      getNewFlightsDataStub.returns(promiseTimeout(1500, 'flights'));
      const result = await getFlights();
      expect(result).to.be.deep.equal('error');
    });
  });
});
