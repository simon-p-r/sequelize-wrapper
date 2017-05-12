'use strict';

const Code = require('code');
const Lab = require('lab');
const Manager = require('../lib/index.js');

const Utils = require('./utils');


// Set-up lab
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;
const before = lab.before;
const after = lab.after;


describe('Manager', () => {

    let manager = null;

    // Fixtures
    const Config = {};
    if (process.env.DIALECT === 'postgres') {
        Config.options = require('./config/pgsql.json');
    }
    else if (process.env.DIALECT === 'mssql') {
        Config.options = require('./config/mssql.json');
    }
    else {
        Config.options = Utils.getOpts();
    }

    Config.options.dbOpts.logging = false;

    const Data = require('./data/array');

    before((done) => {

        const options = Config.options;
        manager = new Manager(options);
        manager.connect((err) => {

            expect(err).to.not.exist();
            expect(manager.dbs.test_db.tables.product).to.be.an.object();
            const table = manager.dbs.test_db.tables.product;
            table.insertMany(Data.records, {}, (err, inserted) => {

                expect(err).to.not.exist();
                done();
            });
        });
    });

    after((done) => {

        manager.dbs.test_db.tables.product.drop({}, (err, results) => {

            expect(err).to.not.exist();
            manager.close(done);
        });
    });

    it('should throw an error when constructed without an options object', (done) => {

        expect(() => {

            new Manager();
        }).throws(Error);
        done();

    });

    it('should return an error on connect method due to invalid database', (done) => {

        const options = Config.options;
        options.dbOpts.host = 'invalid';
        const mgr = new Manager(options);

        mgr.connect((err) => {

            expect(err).to.exist();
            done();
        });
    });



    it('should succeed when using insertOne method', (done) => {

        const table = manager.dbs.test_db.tables.product;
        table.insertOne({ name: 'RAM', price: 50.00, quantity: 250 }, {}, (err, inserted) => {

            expect(err).to.not.exist();
            expect(inserted).to.exist();
            done();
        });

    });


    it('should succeed when using insertMany method', (done) => {

        const table = manager.dbs.test_db.tables.product;
        table.insertMany([{ name: 'SSD', price: 150.00, quantity: 50 }, { name: 'HDD', price: 79.99, quantity: 200 }], {}, (err, inserted) => {

            expect(err).to.not.exist();
            expect(inserted).to.exist();
            done();
        });
    });

    it('should succeed when using find method', (done) => {

        const table = manager.dbs.test_db.tables.product;
        table.find({}, (err, records) => {

            expect(err).to.not.exist();
            expect(records).to.exist().and.to.be.an.array();
            done();
        });
    });

    it('should succeed when using findById method', (done) => {

        const table = manager.dbs.test_db.tables.product;
        table.findById('SSD', {}, (err, record) => {

            expect(err).to.not.exist();
            expect(record).to.be.an.object();
            expect(record.name).to.equal('SSD');
            done();
        });
    });

    it('should succeed when using findOne method', (done) => {

        const table = manager.dbs.test_db.tables.product;
        table.findOne({ where: { name: 'RAM' } }, (err, record) => {

            expect(err).to.not.exist();
            expect(record).to.be.an.object();
            expect(record.name).to.equal('RAM');
            done();
        });
    });

    it('should succeed when using count method', (done) => {

        const table = manager.dbs.test_db.tables.product;
        table.count({}, (err, count) => {

            expect(err).to.not.exist();
            expect(count).to.be.a.number();
            done();
        });
    });

    it('should succeed when using updateById method', (done) => {

        const table = manager.dbs.test_db.tables.product;
        table.updateById('Battery', { quantity: 2000 }, {}, (err, updated) => {

            expect(err).to.not.exist();
            expect(updated[0]).to.be.a.number().and.to.equal(1);
            done();
        });
    });

    it('should succeed when using updatMany method', (done) => {

        const table = manager.dbs.test_db.tables.product;
        table.updateMany({ quantity: 1000 }, { where: { price: 19.99 } }, (err, updated) => {

            expect(err).to.not.exist();
            expect(updated[0]).to.be.a.number();
            done();
        });
    });

    it('should succeed when using deleteById method', (done) => {

        const table = manager.dbs.test_db.tables.product;
        table.deleteById('CPU', {}, (err, deleted) => {

            expect(err).to.not.exist();
            expect(deleted).to.equal(1);
            done();
        });
    });

    it('should succeed when using deleteMany method', (done) => {

        const table = manager.dbs.test_db.tables.product;
        table.deleteMany({}, (err, deleted) => {

            expect(err).to.not.exist();
            // expect(deleted).to.exist();
            done();
        });
    });

});
