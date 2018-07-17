const { expect } = require('chai');
const { gamingArray, findNumMoves, findIndexOfNextPeak, findNumMovesNoRec } = require('../gamingArray');


describe('findIndexOfNextPeak', () => {
    it('handles no peak', () => {
        const arr1 = [5,4,3,2,1];
        expect(findIndexOfNextPeak(arr1, 0)).to.equal(5);
    })
    it('handles a small peak', () => {
        const arr2 = [4,5,3,2,1];
        expect(findIndexOfNextPeak(arr2, 0)).to.equal(1);
    })
    it('handles a medium peak', () => {
        const arr3 = [4,1,3,5,1];
        expect(findIndexOfNextPeak(arr3, 0)).to.equal(3);
    })
    it('handles a middle peak', () => {
        const arr3 = [4,1,3,5,1,9,3,2,];
        expect(findIndexOfNextPeak(arr3, 3)).to.equal(5);
    })
    it('handles the tail peak', () => {
        const arr3 = [4,1,3,5,1,9,3,2,];
        expect(findIndexOfNextPeak(arr3, 5)).to.equal(8);
    })
})

describe('findNumMoves', () => {
    it('handles no peak', () => {
        const arr1 = [5,4,3,2,1];
        expect(findNumMoves(arr1, 0)).to.equal(1);
    })
    it('handles a small peak', () => {
        const arr2 = [4,5,3,2,1];
        expect(findNumMoves(arr2, 0)).to.equal(2);
    })
    it('handles a medium peak', () => {
        const arr3 = [4,1,3,5,1];
        expect(findNumMoves(arr3, 0)).to.equal(2);
    })
    it('handles a middle peak', () => {
        const arr3 = [4,1,3,5,1,9,3,2,];
        expect(findNumMoves(arr3, 3)).to.equal(2);
    })
})

describe('findNumMovesNoRec', () => {
    it('handles no peak', () => {
        const arr1 = [5,4,3,2,1];
        expect(findNumMovesNoRec(arr1, 0)).to.equal(1);
    })
    it('handles a small peak', () => {
        const arr2 = [4,5,3,2,1];
        expect(findNumMovesNoRec(arr2, 0)).to.equal(2);
    })
    it('handles a medium peak', () => {
        const arr3 = [4,1,3,5,1];
        expect(findNumMovesNoRec(arr3, 0)).to.equal(2);
    })
    it('handles a middle peak', () => {
        const arr3 = [4,1,3,5,1,9,3,2,];
        expect(findNumMovesNoRec(arr3, 3)).to.equal(2);
    })
})

describe('gamingArray', () => {
    it('handles no peak', () => {
        const arr1 = [5,4,3,2,1];
        expect(gamingArray(arr1)).to.equal('BOB');
    })
    it('handles a small peak', () => {
        const arr2 = [4,5,3,2,1];
        expect(gamingArray(arr2)).to.equal('ANDY');
    })
    it('handles a medium peak', () => {
        const arr3 = [4,1,3,5,1];
        expect(gamingArray(arr3)).to.equal('ANDY');
    })
    it('handles a middle peak', () => {
        const arr3 = [4,1,3,5,1,9,3,2,];
        expect(gamingArray(arr3)).to.equal('BOB');
    })
})