const chai = require('chai'); 
const expect = chai.expect; 
const TinyURI = require('../src/tinyURI.js');

describe('test encode method', () => {
    it('simple encode usage', () => {
        const encodedURI = TinyURI.encode('testString');

        expect(encodedURI).equal('testString');
    });

    it('encode string with slash', () => {
        const encodedURI = TinyURI.encode('testString/');

        expect(encodedURI).equal('testString%2F');
    });

    it('encode string with space', () => {
        const encodedURI = TinyURI.encode('testString ');

        expect(encodedURI).equal('testString%20');
    });

    it('encode string with ()', () => {
        const encodedURI = TinyURI.encode('testString()');

        expect(encodedURI).equal('testString%28%29');
    });
});