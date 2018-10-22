const { expect } = require('chai');
const {
  parseDataIntoMap,
  getStartingNumber,
  BigMap,
  Query,
} = require('../mergingCommunities');

describe.only('getStartingNumber', () => {
  beforeEach(() => {});
  it('gets the starting number', () => {
    const input = `21 2
      M 1 2
      Q 1`;
    expect(getStartingNumber(input)).to.equal(21);
  });
  afterEach(() => {});
});

describe.only('BigMap', () => {
  beforeEach(() => {});
  describe('executeQuery', () => {
    beforeEach(() => {});
    it('returns size of 1', () => {
      const bigMap = new BigMap(5);
      const query = new Query('Q', [1]);
      expect(bigMap.executeQuery(query)).to.equal(1);
    });
    it('returns undefined for connections', () => {
      const bigMap = new BigMap(5);
      const query = new Query('M', [1, 2]);
      expect(bigMap.executeQuery(query)).to.equal(undefined);
    });
    afterEach(() => {});
  });
  describe('connect', () => {
    let bigMap;
    beforeEach(() => {
      bigMap = new BigMap(5);
      bigMap.connect(
        1,
        2
      );
      bigMap.connect(
        3,
        4
      );
      bigMap.connect(
        1,
        4
      );
    });
    it('connects 1,2,3,4', () => {
      expect(bigMap.getSize(3)).to.equal(4);
    });
    it('leaves 5 alone', () => {
      expect(bigMap.getSize(5)).to.equal(1);
    });
    afterEach(() => {});
  });
  afterEach(() => {});
});
