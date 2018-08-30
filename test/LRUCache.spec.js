const { expect } = require('chai');
const sinon = require('sinon');
const { LRUCache, KeyNode } = require('../LRUCache');

describe(`LRUCache`, () => {
  describe(`insertKeyValuePair`, () => {
    it('updates _leastRecentKey if empty cache', () => {
      const cache = new LRUCache(3);
      cache.insertKeyValuePair('c', 3);
      expect(cache._leastRecentKey).to.equal('c');
    });
    it('updates _mostRecentKey', () => {
      const cache = setUpABCache();
      cache.insertKeyValuePair('c', 3);
      expect(cache._mostRecentKey).to.equal('c');
    });
    it('sets the key and value in the cache', () => {
      const cache = setUpABCache();
      cache.insertKeyValuePair('c', 3);
      expect(cache._cache.c.value).to.equal(3);
    });
    it('updates the size', () => {
      const cache = setUpABCache();
      cache.insertKeyValuePair('c', 3);
      expect(cache._size).to.equal(3);
    });
    it('overwrites the least recently used key when exceed size', () => {
      const cache = setUpABCCache();
      cache.insertKeyValuePair('d', 4);
      expect(cache._cache.a).to.equal(undefined);
      expect(cache._size).to.equal(3);
    });
  });
  describe(`_removeKey`, () => {
    let cache;
    beforeEach(() => {
      cache = setUpABCCache();
    });
    it('removes the key if it exists', () => {
      cache._removeKey('a');
      expect(cache._cache.a).to.be.undefined;
    });
    it('decreases the size if the key exists', () => {
      cache._removeKey('a');
      expect(cache._size).to.equal(2);
    });
    it('links the neighbors together so there is no hole in the linkedList', () => {
      const mySpy = sinon.spy(cache._cache.a, 'linkNeighborsToEachOther');
      cache._removeKey('a');
      expect(mySpy.called).to.be.true;
    });
  });
  describe(`_removeAndUpdateLeastRecentKey`, () => {
    it('removes the key from the graph', () => {
      const cache = setUpABCCache();
      const mySpy = sinon.spy(cache, '_removeKey');
      cache._removeAndUpdateLeastRecentKey();
      sinon.assert.calledWith(mySpy, 'a');
    });
    it('updates _leastRecentKey', () => {
      const cache = setUpABCCache();
      cache._removeAndUpdateLeastRecentKey();
      expect(cache._leastRecentKey).to.equal('b');
    });
  });
  describe(`_setKeyValuePair`, () => {
    it('makes a Key node at that key', () => {
      const cache = setUpABCache();
      cache._setKeyValuePair('c', 3);
      expect(cache._cache.b.next.value).to.equal(3);
    });
  });
  describe(`getValueFromKey`, () => {
    it('handles searching for a key that does not exist', () => {
      const cache = setUpABCache();
      const value = cache.getValueFromKey('z');
      expect(value).to.equal(null);
    });
    it('makes a Key node at that key', () => {
      const cache = setUpABCCache();
      const value = cache.getValueFromKey('c');
      expect(value).to.equal(3);
    });
  });
  it('works for a cache of size 1', () => {
    //I got lazy and didn't keep this clean :(
    const cache = new LRUCache(1);
    cache.insertKeyValuePair('a', 1);
    expect(cache.getMostRecentKey()).to.equal('a');
    expect(cache.getValueFromKey('a')).to.equal(1);
    cache.insertKeyValuePair('b', 2);
    expect(cache.getMostRecentKey()).to.equal('b');
    expect(cache.getValueFromKey('b')).to.equal(2);
    expect(cache.getValueFromKey('a')).to.equal(null);
    cache.insertKeyValuePair('c', 3);
    expect(cache.getValueFromKey('c')).to.equal(3);
    expect(cache.getValueFromKey('b')).to.equal(null);
    expect(cache.getValueFromKey('a')).to.equal(null);
  });
});

function setUpABCCache() {
  const cache = new LRUCache(3);
  cache._size = 3;
  cache._mostRecentKey = 'c';
  cache._leastRecentKey = 'a';
  const { left, middle, right } = setUp123Nodes();
  cache._cache = { a: left, b: middle, c: right };
  return cache;
}
function setUpABCache() {
  const cache = new LRUCache(3);
  cache._size = 2;
  cache._mostRecentKey = 'b';
  cache._leastRecentKey = 'a';
  const { left, right } = setUp12Nodes();
  cache._cache = { a: left, b: right };
  return cache;
}

describe(`KeyNode`, () => {
  beforeEach(() => {
    // node = new KeyNode(2);
  });
  describe(`linkNeighborsToEachOther`, () => {
    it('works normally', () => {
      const { left, middle, right } = setUp123Nodes();
      middle.linkNeighborsToEachOther();
      expect(left.next).to.equal(right);
      expect(right.prev).to.equal(left);
    });
    it('works on edgeCases', () => {
      const { left, right } = setUp12Nodes();
      left.linkNeighborsToEachOther();
      expect(right.prev).to.equal(null);
    });
  });
});

function setUp123Nodes() {
  const left = new KeyNode('a', 1);
  const middle = new KeyNode('b', 2, left);
  const right = new KeyNode('c', 3, middle);
  left.next = middle;
  middle.next = right;
  return { left, middle, right };
}
function setUp12Nodes() {
  const left = new KeyNode('a', 1);
  const right = new KeyNode('b', 2, left);
  left.next = right;
  return { left, right };
}
