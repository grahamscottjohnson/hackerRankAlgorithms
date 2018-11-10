const { expect } = require('chai');
const { minimumBribes } = require('../minimumBribes');

function createAssertFunction(func) {
  return (input, expectedOutput) => {
    expect(func(...input)).to.equal(expectedOutput);
  };
}

const assertMinimumBribes = createAssertFunction(minimumBribes);

describe.only('minimumBribes', () => {
  beforeEach(() => {});
  it('given [1] returns 0', () => {
    assertMinimumBribes([[1]], 0);
  });
  it('given [2,1] returns 1', () => {
    assertMinimumBribes([[2, 1]], 1);
  });
  it('given [1,2,3] returns 0', () => {
    assertMinimumBribes([[1, 2, 3]], 0);
  });
  it('given [1,3,2] returns 1', () => {
    assertMinimumBribes([[1, 3, 2]], 1);
  });
  it('given [3,1,2] returns 2', () => {
    assertMinimumBribes([[3, 1, 2]], 2);
  });
  it('given [3,2,1] returns 3', () => {
    assertMinimumBribes([[3, 2, 1]], 3);
  });
  it('given [2,1,4,3] returns 2', () => {
    assertMinimumBribes([[2, 1, 4, 3]], 2);
  });
  it('given [2,3,4,1] returns 3', () => {
    assertMinimumBribes([[2, 3, 4, 1]], 3);
  });
  it('given [1,4,3,2] returns 3', () => {
    assertMinimumBribes([[1, 4, 3, 2]], 3);
  });
  it('given [3,4,2,1] returns 5', () => {
    assertMinimumBribes([[3, 4, 2, 1]], 5);
  });
  it('given [4,3,2,1] returns "Too chaotic"', () => {
    assertMinimumBribes([[4, 3, 2, 1]], 'Too chaotic');
  });

  //   [2, 3, 4, 1];

  //# - index - 1
  //see 2
  //say that 1 bribe has occured since
  //2-0-1 = 1
  //track 1 since it is misplaced
  //see 3
  //say that 1 bribe has occured
  //3-1-1 = 1
  //don't need to track 2 since it's already placed, but it makes me feel weird for wanting to track now
  //see 4
  //4-2-1 = 1 => 1 bribe
  //see 1
  //1-3-1 = -3 => 0 bribes
  //total is 3 which is correct

  //   [2,1,4,3]

  //1 => 1bribe
  //0
  //1
  //0

  //   [4,3,2,1]

  //3 => too chaotic

  //   [3,1,2]

  //2
  //misplaced: 1
  //-1 => 0
  //misplaced: 2
  //-1 => 0
  //TOTAL 0 (1 + -1)

  //   [3,2,1]

  //2
  //misplaced: 1
  //0 => 0 + 1 misplaced
  //misplaced: 1
  //-2 => 0

  //   [3,4,1,2]
  //2
  //TOTAL 2
  //2
  //TOTAL 4
  //-2
  //-2

  //   [3,4,2,1]
  //2
  //misplaced: 1
  //2
  //misplaced: [1,2]
  //TOTAL 4
  // -1

  //   [1,4,3,2]
  //0
  //2
  //0
  //-2

  //[2,3,5,1,4]
  //1: misplaced [1]
  //1: misplaced [1]
  //2: misplaced [1]
  //0: misplaced [4]
  //0: []
  //Result: 4

  //[2,3,5,4,1]
  //1: misplaced [1]
  //1: misplaced [1]
  //2: misplaced [1]
  //0: +1 misplaced [1]
  //0: []
  //Result: 5

  //   [2, 4, 1, 3];

  afterEach(() => {});
});
