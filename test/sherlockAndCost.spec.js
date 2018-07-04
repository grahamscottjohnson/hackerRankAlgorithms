const {expect} = require('chai');

xdescribe('findLocal', () => {
    beforeEach( () => {
        const testDecrease1 = [100, 99, 10, 7];
            //-1, -89, -3 <--differences
            //next < so increase; next > so decrease
            //increase, decrease, increase
        const testDecrease2 = [100, 99, 98, 10, 7];
            //-1, -1, -88, -3
            //flex, increase, decrease
            //therefore flex is decrease
        const testDecrease5 = [100, 99, 98, 97, 10, 7];
            //-1, -1, -1, -87, -3
            //flex, flex, increase, decrease
            //therefore flex is decrease
        const testDecrease3 = [100, 60, 1];
            //-40, -59
            //increase, decrease
        const testDecrease4 = [100, 40, 1];
            //-60, -39
            //decrease, decrease

        const testIncrease1 = [2, 7, 90, 91];
            //5, 83, 1
            //decrease, increase, decrease
        const testIncrease2 = [2, 7, 8, 90, 91];
            //5, 1, 82, 1
            //next < so increase; next > so decrease
            //increase, decrease, increase, decrease
        const testIncrease3 = [1, 40, 100];
            //39, 60
            //decrease, increase
        const testIncrease4 = [1, 60, 100];
            //59, 40
            //increase, decrease
    })
    it('handles a decreasing sequence', () => {

    })
    it('handles an increasing sequence', () => {

    })
    afterEach( () => {

    })
})

xdescribe('', () => {
    beforeEach( () => {

    })
    it('', () => {
        
    })
    afterEach( () => {

    })
})