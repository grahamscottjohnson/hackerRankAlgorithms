const { expect } = require('chai');
const { abbreviation } = require('../abbreviation');
const { createReader, readFromFile } = require('./reading');

function createAssertFunction(func) {
  return (input, expectedOutput) => {
    expect(func(...input)).to.equal(expectedOutput);
  };
}

describe('abbreviation', () => {
  beforeEach(() => {});
  const assertAbreviation = createAssertFunction(abbreviation);
  it('handles empty input', () => {
    assertAbreviation(['', ''], 'YES');
    assertAbreviation(['dfd', ''], 'YES');
    assertAbreviation(['', 'asdf'], 'NO');
  });
  it('given ["ab", "ab"] returns "YES"', () => {
    assertAbreviation(['ab', 'ab'], 'YES');
  });
  it('given ["ab", "AB"] returns "YES"', () => {
    assertAbreviation(['ab', 'AB'], 'YES');
  });
  it('given ["zAzBz", "AB"] returns "YES"', () => {
    assertAbreviation(['zAzBz', 'AB'], 'YES');
  });
  it('given ["ab", "cab"] returns "NO"', () => {
    assertAbreviation(['ab', 'cab'], 'NO');
  });
  it('given ["KAP", "K"] returns "NO"', () => {
    assertAbreviation(['KAP', 'K'], 'NO');
  });
  it('given ["adb", "AdB"] returns "YES"', () => {
    assertAbreviation(['adb', 'AdB'], 'YES');
  });
  it('given ["afdb", "AdB"] returns "NO"', () => {
    assertAbreviation(['afdb', 'AdB'], 'NO');
  });
  it('given ["GaAB", "GAB"] returns "YES"', () => {
    assertAbreviation(['GaAB', 'GAB'], 'YES');
  });
  xit('given ["GadaDB", "GADDB"] returns "YES"', () => {
    assertAbreviation(['GadaDB', 'GADDB'], 'YES');
  });
  xit('works for Input06 from HackerRank', async () => {
    const inputs = parseInput(
      await readFromFile('./testData/abbreviationInput06.txt')
    );
    const outputs = parseOutput(
      await readFromFile('./testData/abbreviationOutput06.txt')
    );
    inputs.forEach((input, index) => {
      console.log(input, outputs[index]);
      assertAbreviation(input, outputs[index]);
    });
  });
  afterEach(() => {});
});

function parseInput(text) {
  const reader = createReader(text);
  const numberOfQueries = reader();
  return parseQueries(reader, numberOfQueries);
}

function parseQueries(reader, numberOfQueries) {
  const queries = [];
  for (let i = 0; i < numberOfQueries; i++) {
    queries.push([reader(), reader()]);
  }
  return queries;
}

function parseOutput(text) {
  const reader = createReader(text);
  return parseWord(reader, text.length);
}

function parseWord(reader, amount) {
  const queries = [];
  for (let i = 0; i < amount; i++) {
    queries.push(reader());
  }
  return queries;
}
