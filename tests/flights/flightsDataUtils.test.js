const { expect } = require('chai');
const {
  processApiResponse,
  processFlightsData,
} = require('../../flights/flightsDataUtils');
const flightLists = require('../fixtures/flightLists');
const rawResponse = require('../fixtures/rawResponse');

describe('flights', () => {
  describe('processApiResponse', () => {
    it('should return list of flights ', () => {
      const result = processApiResponse(rawResponse);
      expect(result).to.be.deep.equal(flightLists[0]);
    });
  });

  describe('processFlightsData', () => {
    it('should filter flights correctly', () => {
      const { flights } = processFlightsData(...flightLists);
      expect(flights).to.be.an('object');
      expect(Object.keys(flights).length).to.equal(3);
    });
    it('should return just error object value if its an argument', () => {
      const listsWithError = [...flightLists, { error: 'Error' }];
      const result = processFlightsData(...listsWithError);
      expect(result).to.be.deep.equal({ error: 'Error' });
    });
  });
});
