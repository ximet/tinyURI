const chai = require('chai'); 
const expect = chai.expect; 

describe('test', () => {
    it('test', () => {
        const param = 'testNode';

        expect(param).equal(param);
    });
});