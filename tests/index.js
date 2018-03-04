const chai = require('chai'); 
const expect = chai.expect; 
const TinyURI = require('../src/tinyURI.js');


describe('test TinyURI', () => {
    it('test with undefined param', () => {
        const uri = TinyURI(undefined);
        try { 
            expect(uri).to.throw(TypeError);
        }
        catch(err) {
            expect(err).to.eql(new Error('Property does not exist in model schema.'));
        }
    })
})

describe('test encode method', () => {
    it('simple encode usage', () => {
        const encodedURI = TinyURI.encode('testString');

        expect(encodedURI).to.eql('testString');
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

describe('encodeQuery', () => {
    it('encode query with escapeQuerySpace', () => {
        const encodedQuery = TinyURI.encodeQuery(' ', true);

        expect(encodedQuery).equal('+');
    });

    it('encode query without escapeQuerySpace', () => {
        const encodedQuery = TinyURI.encodeQuery(' ', false);

        expect(encodedQuery).equal('%20');
    });
});

describe('test decode method', () => {
    it('simple encode usage', () => {
        const encodedURI = TinyURI.decode('testString');

        expect(encodedURI).equal('testString');
    });

    it('decode string with slash', () => {
        const encodedURI = TinyURI.decode('testString%2F');

        expect(encodedURI).equal('testString/');
    });

    it('decode string with space', () => {
        const encodedURI = TinyURI.decode('testString%20');

        expect(encodedURI).equal('testString ');
    });

    it('decode string with ()', () => {
        const encodedURI = TinyURI.decode('testString%28%29');

        expect(encodedURI).equal('testString()');
    });
});

describe('decodeQuery', () => {
    it('decode query with escapeQuerySpace', () => {
        const encodedQuery = TinyURI.decodeQuery('+', true);

        expect(encodedQuery).equal(' ');
    });

    it('decode query without escapeQuerySpace', () => {
        const encodedQuery = TinyURI.decodeQuery('%20', false);

        expect(encodedQuery).equal(' ');
    });
});

