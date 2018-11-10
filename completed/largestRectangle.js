'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString
    .replace(/\s*$/, '')
    .split('\n')
    .map(str => str.replace(/\s*$/, ''));

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Complete the largestRectangle function below.
function largestRectangle(list) {
  return new Algo().solve(list);
}

class Algo {
  constructor() {
    this.possibleAreas = [];
    this.queue = new Queue();
    this.blockLength = 0;
    this.currentMin = -Infinity;
  }

  solve(list) {
    if (list.length === 0) return 0;
    for (const num of list) {
      this.visitNextBuilding(num);
    }
    this.countLastBuildings();
    return Math.max(...this.possibleAreas);
  }

  visitNextBuilding(value) {
    let currentBlockLength = 0;
    while (this.smallerThanPrevBuilding(value)) {
      currentBlockLength = this.countLastBuildingSection(currentBlockLength);
    }
    this.queue.push({ value, prevBlockLength: 1 + currentBlockLength });
  }

  smallerThanPrevBuilding(num) {
    if (!this.queue.end) return false;
    return num < this.queue.end.value;
  }

  countLastBuildings() {
    let currentBlockLength = 0;
    while (!this.queue.isEmpty()) {
      currentBlockLength = this.countLastBuildingSection(currentBlockLength);
    }
  }

  countLastBuildingSection(currentBlockLength) {
    const node = this.queue.pop();
    currentBlockLength += node.prevBlockLength || 1;
    const rectArea = currentBlockLength * node.value;
    this.possibleAreas.push(rectArea);
    return currentBlockLength;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  get front() {
    if (this.isEmpty()) return null;
    return this.head.value;
  }

  get end() {
    if (this.isEmpty()) return null;
    return this.tail.value;
  }

  push(value) {
    const newTail = new Node(value);
    if (this.isEmpty()) {
      this.head = newTail;
    } else {
      this.tail.linkNext(newTail);
    }
    this.tail = newTail;
    this.length++;
  }

  pop() {
    if (this.isEmpty()) return;
    this.length--;
    const value = this.tail.value;
    const newTail = this.tail.prev;
    this.tail.unlinkPrev();
    this.tail = newTail;
    if (this.isEmpty()) {
      this.head = null;
    }
    return value;
  }

  shift() {
    if (this.isEmpty()) return;
    this.length--;
    const value = this.head.value;
    const newHead = this.head.next;
    this.head.unlinkNext();
    this.head = newHead;
    if (this.isEmpty()) {
      this.tail = null;
    }
    return value;
  }

  isEmpty() {
    return this.length === 0;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }

  unlinkNext() {
    if (this.next) {
      this.next.prev = null;
      this.next = null;
    }
  }

  unlinkPrev() {
    if (this.prev) {
      this.prev.next = null;
      this.prev = null;
    }
  }

  linkNext(node) {
    this.unlinkNext();
    this.next = node;
    node.unlinkPrev();
    node.prev = this;
  }
}

exports.largestRectangle = largestRectangle;

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine(), 10);

  const h = readLine()
    .split(' ')
    .map(hTemp => parseInt(hTemp, 10));

  let result = largestRectangle(h);

  ws.write(result + '\n');

  ws.end();
}
