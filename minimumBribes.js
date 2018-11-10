'use strict';

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

// Complete the minimumBribes function below.
function minimumBribes(swappedLine) {
  return new Algo().solve(swappedLine);
}

class Algo {
  constructor() {
    this.revertToDefault();
  }

  revertToDefault() {
    this.numBribes = 0;
    this.swappedLine = [];
    this.misplaced = []; //expect only 1 or 2 elements in here
    this.visited = new Set();
    this.totalDisplacement = 0;
  }

  solve(swappedLine) {
    this.revertToDefault();
    this.swappedLine = swappedLine;
    this.iterateOnSwappedLine();
    return this.tooChaotic ? 'Too chaotic' : this.numBribes;
  }

  iterateOnSwappedLine() {
    for (
      let index = 0;
      index < this.swappedLine.length && !this.tooChaotic;
      index++
    ) {
      this.logInfo();
      const num = this.swappedLine[index];
      this.visited.add(num);
      const displacement = num - index - 1;
      this.handleDisplacement(num, displacement, index);
    }
  }

  handleDisplacement(num, displacement, index) {
    this.visited.add(num);
    this.removeFromMisplaced(num);
    if (displacement > 2) {
      this.tooChaotic = true;
    } else if (displacement > 0) {
      this.numBribes += displacement;
      this.handlePositiveMisplacement(index + 1);
    } else if (displacement <= 0) {
      if (this.isLargerThanMisplaced(num)) {
        this.numBribes++;
      }
    }
  }

  removeFromMisplaced(num) {
    this.misplaced = this.misplaced.filter(val => val !== num);
  }

  handlePositiveMisplacement(num) {
    if (!this.visited.has(num)) {
      this.misplaced.push(num);
    }
  }

  isLargerThanMisplaced(num) {
    return num > Math.max(...this.misplaced) && this.misplaced.length;
  }

  logInfo() {
    console.log(this.visited, this.misplaced, this.numBribes);
  }
}

exports.minimumBribes = minimumBribes;

function main() {
  const t = parseInt(readLine(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const n = parseInt(readLine(), 10);

    const q = readLine()
      .split(' ')
      .map(qTemp => parseInt(qTemp, 10));

    minimumBribes(q);
  }
}
