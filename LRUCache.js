//https://www.algoexpert.io/questions/LRU%20Cache

class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize || 1;
    this._size = 0; //don't need this property, you can get this data by iterating off of cache, but this would make the algorithm slower
    this._cache = {};
    this._mostRecentKey = null;
    this._leastRecentKey = null;
  }

  insertKeyValuePair(key, value) {
    this._removeKey(key);
    this._assignNextLeastRecentKey(key);
    this._setKeyValuePair(key, value);
    this._setMostRecentKey(key);
    this._size += 1;
  }

  _removeKey(key) {
    if (this._cache[key]) {
      this._cache[key].linkNeighborsToEachOther();
      delete this._cache[key];
      this._size -= 1;
    }
  }

  _assignNextLeastRecentKey(key) {
    if (this._isFull()) {
      this._removeAndUpdateLeastRecentKey();
    }
    if (this._isEmpty()) {
      this._leastRecentKey = key;
    }
  }

  _isEmpty() {
    return this._size === 0;
  }
  _isFull() {
    return this._size === this.maxSize;
  }

  _removeAndUpdateLeastRecentKey() {
    if (!this._isEmpty()) {
      const nextLeastRecentKey =
        this.maxSize === 1 ? null : this._cache[this._leastRecentKey].next.key;
      this._removeKey(this._leastRecentKey);
      this._leastRecentKey = nextLeastRecentKey;
    }
  }

  _setKeyValuePair(key, value) {
    const mostRecentKeyNode = this._cache[this._mostRecentKey];
    const newKeyNode = new KeyNode(key, value);
    this._cache[key] = newKeyNode;
    if (mostRecentKeyNode) {
      mostRecentKeyNode.setNext(newKeyNode);
    }
  }

  _setMostRecentKey(key) {
    this._mostRecentKey = key;
  }

  getValueFromKey(key) {
    if (this._cache[key]) {
      this._setMostRecentKey(key);
      return this._cache[key].value;
    }
    return null;
  }

  getMostRecentKey() {
    return this._mostRecentKey;
  }
}

class KeyNode {
  constructor(key, value, prev = null, next = null) {
    this.key = key;
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
  linkNeighborsToEachOther() {
    if (this.prev) {
      this.prev.next = this.next;
    }
    if (this.next) {
      this.next.prev = this.prev;
    }
  }
  setNext(node) {
    this.next = node;
    node.prev = this;
  }
}

exports.LRUCache = LRUCache;
exports.KeyNode = KeyNode;
