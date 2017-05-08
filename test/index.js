'use strict';


const Code = require('code');
const Lab = require('lab');
const Manager = require('../lib/index.js');

// Fixtures



// Set-up lab
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;
// const afterEach = lab.afterEach;
// const beforeEach = lab.beforeEach;

describe('Manager', () => {


    it('should throw an error when constructed without an options object', (done) => {

        expect(() => {

            new Manager();
        }).throws(Error);
        done();

    });

    it('should construct manager object', (done) => {

        const manager = new Manager({
            
        });
        expect(manager).to.be.an.object();
        done();

    });

});
