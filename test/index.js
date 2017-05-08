'use strict';

const Code = require('code');
const Lab = require('lab');
const Manager = require('../lib/index.js');

// Fixtures
const Utils = require('./utils');

// Set-up lab
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('Manager', () => {


    it('should throw an error when constructed without an options object', (done) => {

        expect(() => {

            new Manager();
        }).throws(Error);
        done();

    });

    it('should construct manager object with valid options', (done) => {

        const options = Utils.getOpts();
        const manager = new Manager(options);
        expect(manager).to.be.an.object();
        manager.connect((err) => {

            expect(err).to.not.exist();
            manager.close(done);
        });
    });



});
