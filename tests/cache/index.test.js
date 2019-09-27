const { expect } = require('chai');
const sinon = require('sinon');
const flights = require('../../flights/flightsDataUtils');
const cache = require('../../cache');

describe('cache', () => {
  describe('setInitial', async () => {
    before(() => {
      sinon.stub(flights, 'getNewFlightsData');
      flights.getNewFlightsData.returns({ error: 'error' });
      flights.getNewFlightsData
        .onThirdCall()
        .returns({ flights: 'flightsData' });
    });

    after(() => {
      flights.getNewFlightsData.restore();
    });

    it('should call itself until proper data is received', async () => {
      await cache.setInitial();

      expect(flights.getNewFlightsData.callCount).to.be.equal(3);
      expect(cache.getData()).to.deep.equal({
        dataStatus: 'Cached',
        flights: 'flightsData',
      });
    });
  });

  describe('setData', async () => {
    const expectedCache = {
      dataStatus: 'Cached',
      flights: 'flightsData',
    };

    it('should set new cache if flight new flight data available', async () => {
      const result = cache.setData({ flights: 'flightsData' });

      expect(result).to.be.equal(true);
      expect(cache.getData()).to.deep.equal(expectedCache);
    });

    it('should set new cache if flight new flight data available', async () => {
      const result = cache.setData({ error: 'errorData' });

      expect(result).to.be.equal(false);
      expect(cache.getData()).to.deep.equal(expectedCache);
    });
  });

  describe('getDataOnTimeout', async () => {
    const expectedCache = {
      error: { message: 'Service took too long to respond' },
      dataStatus: 'Cached',
      flights: 'flightsData',
    };

    it('should return a promise', () => {
      const result = cache.getDataOnTimeout(100);

      expect(result).to.be.a('promise');
    });

    it('should after specified delay return cached data', async () => {
      const result = await cache.getDataOnTimeout(100);

      expect(result).to.deep.equal(expectedCache);
    });
  });
});
