const {expect} = require('chai');
const {findTargetLetters, 
    findFirstSubstring,
    decrementLeft,
    steadyGene,
    findIfShouldReplaceGene} = require('../bearAndSteady.js');

// {
//     A: 4,
//     G: -1,
//     T: -1,
//     C: -2,
// }
const gene = 'GAAATAAA';
describe('findTargetLetters', () => {
    it('passes HackerRank', ()=>{
        expect( findTargetLetters(gene) ).to.deep.equal({
            A: 4,
        });
    });
    it('passes HackerRank', ()=>{
        expect( findTargetLetters('AAAAAAGGGGGCCCCC') ).to.deep.equal({
            A: 2,
            G: 1,
            C: 1,
        });
    });
});

describe('findFirstSubstring', () => {
    it ('tests for gene replacement correctly', () => {
        const letters = {
            A: 0,
            G: 0,
            T: 0,
            C: 0,
        }
        const targets = {
            A: 4,
        }
        expect( findIfShouldReplaceGene(letters, targets) ).to.equal(false);
        letters.A += 2;
        expect( findIfShouldReplaceGene(letters, targets) ).to.equal(false);
        letters.A += 2;
        expect( findIfShouldReplaceGene(letters, targets) ).to.equal(true);
    });
    it('passes HackerRank', () => {
        expect( findFirstSubstring(gene, {
            A: 4,
        }) ).to.deep.equal([0,5,{
            A: 4,
            G: 1,
            T: 1,
            C: 0,
        }]);
    });
});

describe('decrementLeft', () => {
    it('passes HackerRank', () => {
        expect( decrementLeft(gene, {
            A: 4,
        }, 0, 5, {
            A: 4,
            G: 1,
            T: 1,
            C: 0,
        }) ).to.deep.equal([1,5, {
            A: 4,
            G: 0,
            T: 1,
            C: 0,
        }]);
    });
    it('handles red herrings', () => {
        expect( decrementLeft('ATAAAT', {
            A: 2,
            T: 2,
        }, 0, 5, {
            A: 4,
            G: 0,
            T: 2,
            C: 0,
        }) ).to.deep.equal([1,5, {
            A: 3,
            G: 0,
            T: 2,
            C: 0,
        }]);
        expect( decrementLeft('ATAAATT', {
            A: 2,
            T: 2,
        }, 0, 6, {
            A: 4,
            G: 0,
            T: 3,
            C: 0,
        }) ).to.deep.equal([3,6, {
            A: 2,
            G: 0,
            T: 2,
            C: 0,
        }]);
    });
});
describe('steadyGene', () => {
    const test2 = 'ACAAAAATAAACAAAAACAAAAAAAAAATAAATACAATAAAAAAAAAAAATGAAATACAACAACAAATAAAATAAAAACGACTAAAAAATAAAAAAAAAAAAAAAAAGAGTACTAAAAAAAAAAAAAAAAAATAAAAAAAAAAAAAACACAATCAAAATAAACAAAAAAAAAAAAACCAAAATAATCAACAAAAAAAAAAAAAACAAAAACAACAACAAACAAAAAAAAACACAAACAAAAAAAAAAAAAAAACAAAACAAACAAAAAAAAAAAAACAAAAAAACAAAAAAAAAAAAAAAAACAAAAAAAAAAATAAAAAAAAAAAAAAAAAAAAAACAAACAAAAAAAAAAAATACAAAAAGCTATAAAAAAAAAAAAATTAAAAAACAAAAAAAAATAAAAAAAAAAAAAAAAAAAAAAAATAAAAAAAAAAAAAAAAAAAAAATAAAAAAAAAAAAAAAAAAGAAAAACAAAAAAAAAAAAAAAAACAACCAAAAAACAAAAAAAAACTAAAAAAAAAAAAAAAAAAAAAAAAAAATAACAAAAAACACAAAAAAAAAAAAGAAAGAAAAAAAACACAAAAAAAAACAAACAAAAAAAAAAAAAAAAAAAGAAAACAAAAAAACAAAAAAAACAAAAAAAAAACAAAAATTGGACAAAAAAAAACAAAAAAAAAAAACAAAAAAAGTAAAACAAATAAAAAAACAAAAAAAACAAAAAAAAAAAAAAAAAACAAAAAAGAAACAAAAAACAAAAAAAAATAACAAAACCAAAAAACAAATAAAAAACAAAAAAAATAACACAAAAAAAAAAAGAAACAAAAAAAAAAAAAAAAAAAAAAATTATAAAAAAAAAAAAAAAACAAAAAAAAAAAAAACAAAAAAAAAAGGAAAAAAAAAAAAAAAAAAAAAAAAAAATAACTAAACAAAAAAAAACAAACAAAAAATCAAAAAAAAAAAAGAAAAAAGAATAAGCAACAAAAACACAAAAAAAAAAAAAAAAAAAAAAAACATAAACAATAATAAAAAAAAAACAAAAAAAACAAAAGAACAACAAAAAACAAAACTAAACAAATAAAAAAAAAAAAACAAAAACTACAAAAAAAAAAAGAAAAAAAAAGAAAAAAAAACAAATAAAAGAAAAAAAAAAAAAAAAAAAACACAAAAAAAAAAATAAAAAAAAAAAAAAAAACAAAATAAACAAAAACAAAGAAAAAAACAAACAAAAAAAAAAAACAAAAAACTAAAAACAAAAAAAAAACAAAACACAAAAAAAAAAAAAAATAAAAAAAAAACAAAAAAACAAAAAGGAAAAAAAAAAAAGAACAAAAAAAAAAACAACAGAAAAAAGAAAAGAAAAAAAAAAAAAGACCACAAAATAAAAAAAAACAACAAACAAAAAAAAACAAAACAAAAAAACGAACAAAAAAAACAAAAACAAAAAAAAAAAAAAAAAAAAAAAGGCAAAAACAAAAAAAACAAAACAAAACAAAAAAACAAAAAAAAATTAAGATAAAGAACAAAAAAAGAAGAGAAAAAATTAACAAAAAAAAAAAAATAAAAAATACAAAAAGAAATAAAAAATACAACACACAACAAAAACGAAAAAAAAAAAAAAAACACAAAATAGAAAAAAAAAAAAAACAAAAAAAAAAAAAAGAAAAAAACAAAAAAAAAAAAATAAAAAAAAACGACACAGAAACAAAAAATAACAAAAAAAAAAAAAATAAAAAAAAAACAAAAAAAAAACAAAAAATAAAAAAAAAAACAAACAAAAAAAAAAAAAAAATAAAAAAAAAAAAAGCAAAACATAAACAAGAAAAAAAAAAAAAGTACAAATAACAAAACAAAAAAGACACTAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAAAACCACAAAACAAAAAAATAAAGCAAAAAAAAAAAAAAAAAAAAAAAAAAAATAAATGAAAAAAAAAAGAAAACCAAAAAAATAAAAGA';
    it('passes HackerRank', () => {
        expect( steadyGene(gene) ).to.equal(5);
    });
    it('passes HackerRank 2', () => {
        expect( steadyGene(test2) ).to.equal(1393);
    });
});