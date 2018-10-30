async function runFromFile(path, callback) {
  const fs = require('fs');
  const myPromise = new Promise(resolve => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) throw err;
      resolve(data);
    });
  });

  const fileContent = await myPromise;
  return callback(fileContent);
}

async function readFromFile(path) {
  const fs = require('fs');
  const myPromise = new Promise(resolve => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) throw err;
      resolve(data);
    });
  });

  const fileContent = await myPromise;
  return fileContent;
}

function createReader(inputString) {
  let currentLine = 0;
  inputString = inputString
    .trim()
    .split('\n')
    .map(str => str.trim());

  return function readLine() {
    return inputString[currentLine++];
  };
}

module.exports = {
  runFromFile,
  readFromFile,
  createReader,
};
