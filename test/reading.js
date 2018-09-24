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

exports.runFromFile = runFromFile;
