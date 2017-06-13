'use strict';

const Type = require('basic-utils');

const Utils = require('./utils');

module.exports = class TableInterface {

    constructor(sql, tableName, model) {

        // sequelize sql object, string name of table and definition of field names and types
        this.interface = sql.define(tableName, model.definition, model.options );
        this._pk = Object.keys(this.interface.primaryKeys)[0];
    };

    find() {

        // parse args as options by definiton are not required
        const cb = (arguments.length === 1 ? arguments[0] : arguments[1]);
        const options = (arguments.length === 1 ? {} : arguments[0]);
        this.interface.findAll(options).asCallback(cb);
    }

    findById(id, options, cb) {

        // parse args as options by definiton are not required
        this.interface.findById(id, options).asCallback(cb);
    }

    findOne() {

        // parse args as options by definiton are not required
        const cb = (arguments.length === 1 ? arguments[0] : arguments[1]);
        const options = (arguments.length === 1 ? {} : arguments[0]);
        this.interface.findOne(options).asCallback(cb);
    }

    count() {

        // parse args as options by definiton are not required
        const cb = (arguments.length === 1 ? arguments[0] : arguments[1]);
        const options = (arguments.length === 1 ? {} : arguments[0]);
        this.interface.count(options).asCallback(cb);
    }

    insertOne() {

        // parse args as options by definiton are not required
        const cb = arguments[arguments.length - 1];
        if (!Type.isFunction(cb)) {
            throw new Error('Callback is not a function');
        }

        const options = (arguments.length === 2 ? {} : arguments[1]);
        const rec = arguments[0];
        if (!Type.isObj(rec)) {
            return cb(new Error('Insert one only accepts a record object as first parameter'), null);
        }

        this.interface.create(rec, options).asCallback((err, inserted) => {

            if (err) {
                const error = Utils.createError(err);
                return cb(error, null);
            }
            return cb(null, inserted);
        });
    }

    insertMany() {

        // parse args as options by definiton are not required
        const cb = arguments[arguments.length - 1];
        if (!Type.isFunction(cb)) {
            throw new Error('Callback is not a function');
        }

        const options = (arguments.length === 2 ? {} : arguments[1]);
        const recs = arguments[0];
        if (!Type.isArray(recs)) {
            return cb(new Error('Insert many only accepts an array of record object as first parameter'), null);
        }

        this.interface.bulkCreate(recs, options).asCallback((err, inserted) => {

            if (err) {
                const error = Utils.createError(err);
                return cb(error, null);
            };
            return cb(null, inserted);
        });
    }

    deleteMany(options, cb) {

        // parse args as options by definiton are not required
        Object.assign(options, { truncate:  true , cascade: false });
        this.interface.destroy(options).asCallback(cb);
    }

    deleteById(id, options, cb) {

        // parse args as options by definiton are not
        const pk = this._pk;
        const opts = {
            where: {}
        };
        opts.where[pk] = id;
        Object.assign(options, opts);
        this.interface.destroy(options).asCallback(cb);
    }

    updateById(id, rec, options, cb) {

        // parse args as options by definiton are not required
        const pk = this._pk;
        const opts = {
            where: {}
        };
        opts.where[pk] = id;
        Object.assign(options, opts);
        this.interface.update(rec, options).asCallback(cb);
    }


    updateMany(recs, options, cb) {

        // parse args as options by definiton are not required
        this.interface.update(recs, options).asCallback(cb);
    }

    drop() {

        const cb = (arguments.length === 1 ? arguments[0] : arguments[1]);
        const options = (arguments.length === 1 ? {} : arguments[0]);
        this.interface.drop(options).asCallback(cb);
    }

    sync() {

        const cb = (arguments.length === 1 ? arguments[0] : arguments[1]);
        const options = (arguments.length === 1 ? {} : arguments[0]);
        this.interface.sync(options).asCallback(cb);
    }


};
