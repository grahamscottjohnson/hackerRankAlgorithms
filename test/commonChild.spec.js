const {expect} = require('chai');
// const {
//     getAllIndicesOfLetter,
//     getCommonChildren,
//     getKey,
//     commonChild,
// } = require('../commonChild');
// const stolen = require('../commonChild');
// const commonChild = stolen.commonChild;
const commonChild = require('./../commonChild.js')

describe('commonChild', () => {
    beforeEach( () => {

    })
    xdescribe('commonChildren', () => {
        let hash;  
        beforeEach( () => {
            hash = {};
        })
        it('has a base case and modifies the hash', () => {
            commonChildren( hash, 'A', 'B' );
            // commonChildren( hash, {value: 'A', length: 1}, {value: 'B', length: 1} );
            expect( hash ).to.deep.equal( 
                { A_B: '' } 
            );
        })
        it('uses the hash', () => {
            hash = { ADD_BDD: 'pi' };
            commonChildren( hash, 'ADD', 'BDD' );
            // commonChildren( hash, {value: 'ADD', length : 1}, {value: 'BDD', length: 1 } );
            expect( hash ).to.deep.equal( 
                { ADD_BDD: 'pi' }
            );
        })
        it('puts all new combinations with first letter into hash', () => {
            hash = {};
            commonChildren( hash, 'ADD', 'BDD' );
            // commonChildren( hash, {value: 'ADD', length : 1}, {value: 'BDD', length: 1 } );
            expect( hash ).to.deep.equal({
                D_D: 'D',
                DD_D: 'D', 
                D_DD: 'D', 
                DD_DD: 'DD', 
                ADD_DD: 'DD',
                DD_BDD: ['DD', 'D'],
                ADD_BDD: 'DD',
             }
            );
        })
        afterEach( () => {
            hash = {};
        })
    })
    it('works', () => {
        expect( commonChild('SHINCHAN', 'NOHARAAA') ).to.equal(3);
        expect( commonChild('ASDFHIASDFASDFI', 'MMQQWMMQMFFDDIMQMQMQWWMQM') ).to.equal(4);
    })
    xit('', () => {

    })
    afterEach( () => {

    })
})