const chai = require('chai');
const { expect } = chai;
const { activityNotifications, generateMedians, BST } = require(`./../activityNotifications`);

xdescribe('new BST', () => {
    const testObjectHead = {
        key: 6,
        left: null,
        right: null,
        size: 3,
        height: 2,
    }
    const testObjectLeft = {
        key: 3,
        left: null,
        right: null,
        size: 1,
        height: 1,
    }
    const testObjectRight = {
        key: 8,
        left: null,
        right: null,
        size: 1,
        height: 1,
    }
    xit('inserts correctly', () => {
        const bst = new BST(6);
        bst.insert(3);
        testObjectHead.left = testObjectLeft;
        expect(bst).to.equal( testObjectHead );
        bst.insert(8);
        testObjectHead.right= testObjectRight;
        //how do I test this? do I really create a crappy object?
        expect(bst).to.equal( testObjectHead );
    });
    it('updates size correctly', () => {
        const bst = new BST(6);
        bst.insert(3);
        bst.insert(4);
        bst.insert(5);
        bst.insert(7);
        bst.insert(8);
        expect(bst.size).to.equal(6);
    });
    it('balances a small tree', () => {
        const bst = new BST(6);
        bst.insert(3);
        bst.insert(4);
        expect(bst.key).to.equal(4);
    });
    describe('balance gets the correct height', () => {
        it('for small tree', () => {
            const bst = new BST(6);
            bst.insert(3);
            bst.insert(4);
            expect(bst.height).to.equal(2);
            expect(bst.left.height).to.equal(1);
            expect(bst.right.height).to.equal(1);
        });
        it('for medium tree', () => {
            const bst = new BST(6);
            bst.insert(3);
            bst.insert(4);
            bst.insert(9);
            bst.insert(10);
            expect(bst.height).to.equal(3);
        });
        it('for a big tree', () => {
            const bst = new BST(6);
            bst.insert(3);
            bst.insert(4);
            bst.insert(5);
            bst.insert(7);
            bst.insert(8);
            expect(bst.height).to.equal(3);
            expect(bst.left.height).to.equal(2);
            bst.insert(1);
            bst.insert(2);
            expect(bst.height).to.equal(4);
            expect(bst.left.left.height).to.equal(2);
        });
    });
});

xdescribe('BST should delete', () => {
    it ('a tiny tree', () => {
        const bst = new BST(6);
        bst.insert(3);
        bst.delete(3);
        expect(bst.size).to.equal(1);
        expect(bst.height).to.equal(1);
        expect(bst.key).to.equal(6);
    });
    it ('its head', () => {
        const bst = new BST(6);
        bst.insert(3);
        bst.delete(6);
        expect(bst.size).to.equal(1);
        expect(bst.height).to.equal(1);
        expect(bst.key).to.equal(3);
    });
    it ('a medium tree', () => {
        const bst = new BST(6);
        bst.insert(3);
        bst.insert(7);
        bst.insert(8);
        bst.insert(5);

        bst.delete(3);
        bst.delete(6);
        bst.delete(5);
        bst.delete(7);
        expect(bst.size).to.equal(1);
        expect(bst.height).to.equal(1);
        expect(bst.key).to.equal(8);
    });
})

xdescribe('generateMedians', () => {
    it( 'generates the correct medians for hackerRank tests', () => {
       expect( generateMedians([2, 3, 4, 2, 3, 6, 8, 4, 5], 5) )
        .to.equal( [3, 3, 4, 4, 5] );
        expect( generateMedians([1, 2, 3, 4, 4], 4) )
        .to.equal( [2.5, 3,5]);
    })
});

xdescribe('activity notifications', function(){
    it ('should pass hackerRank tests', () => {
        expect( activityNotifications([1, 2, 3, 4, 4], 4))
        .to.equal(0);
        expect( activityNotifications([2, 3, 4, 2, 3, 6, 8, 4, 5], 5))
        .to.equal(2);
    });
});
