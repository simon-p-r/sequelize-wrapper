'use strict';

const Code = require('code');
const Lab = require('lab');
const Manager = require('../lib/index.js');


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
    const Data = require('./data/array');

    // Config
    const Config = {};
    if (process.env.DIALECT === 'mssql') {
        Config.options = require('./config/mssql.json');
    }
    else {
        Config.options = require('./config/pgsql.json');
        if (!process.env.TRAVIS) {
            Config.options.dbOpts.password = process.env.PGPASSWORD;
        }
    }

    Config.options.dbOpts.logging = false;


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
            manager.dbs.test_db2.tables.country.drop({}, (err, results2) => {

                expect(err).to.not.exist();
                manager.close(done);
            });
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

    it('should test getDbNames method', (done) => {

        expect(manager.getDbNames()).to.be.an.array().and.have.length(2);
        done();
    });


    it('should test getTableNames method', (done) => {

        expect(manager.getTableNames()).to.be.an.array().and.have.length(0);
        expect(manager.getTableNames('test_db')).to.be.an.array().and.have.length(1);
        done();
    });

    it('should test getTableSchema method', (done) => {

        expect(manager.getTableSchema()).to.be.an.array().and.have.length(0);
        const tableSchema = manager.getTableSchema('test_db', 'product');
        expect(tableSchema).to.be.an.object();
        done();
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
        table.deleteMany({}, (err) => {

            expect(err).to.not.exist();
            done();
        });
    });

    it('should not created timestamps unless configured', (done) => {

        const table = manager.dbs.test_db2.tables.country;
        const rec = {
            name: 'United Kingdom',
            capital_city: 'London',
            language: 'English',
            timezone: 'GMT',
            latitude: 51.5085300,
            longitude: -0.1257400,
            eu_member: true,
            pop_density_percent: 81.58,
            created_at: Date.now()
        };

        table.insertOne(rec, {}, (err, inserted) => {

            expect(err).to.not.exist();
            expect(inserted.createdAt).to.not.exist();
            expect(inserted.updatedAt).to.not.exist();
            done();
        });
    });

});
