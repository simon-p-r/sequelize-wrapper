'use strict';


module.exports = class TableInterface {

    constructor(sql, tableName, definition) {

        // sequelize sql object, string name of table and definition of field names and types
        this.interface = sql.define(tableName, definition);
    };

    find(options, cb) {

        // parse args as options by definiton are not required
        this.interface.findAll(options).asCallback(cb);
    }

    findById(options, cb) {

        // parse args as options by definiton are not required
        this.interface.findById(options).asCallback(cb);
    }

    findOne(options, cb) {

        // parse args as options by definiton are not required
        this.interface.findOne(options).asCallback(cb);
    }

    count(options, cb) {

        // parse args as options by definiton are not required
        this.interface.count(options).asCallback(cb);
    }

    insertOne(rec, options, cb) {

        // parse args as options by definiton are not required
        this.interface.create(rec, options).asCallback(cb);
    }

    insertMany(recs, options, cb) {

        // parse args as options by definiton are not required
        this.interface.bulkCreate(recs, options).asCallback(cb);
    }

    deleteMany(options, cb) {

        // parse args as options by definiton are not required
        this.interface.destroy(options).asCallback(cb);
    }

    deleteOne(options, cb) {

        // parse args as options by definiton are not required
        options.limit = 1;
        this.interface.destroy(options).asCallback(cb);
    }

    deleteById(id, options, cb) {

        // parse args as options by definiton are not
        options.where = { id };
        this.interface.destroy(options).asCallback(cb);
    }

    updateOne(rec, options, cb) {

        // parse args as options by definiton are not required
        this.interface.update(rec, options).asCallback(cb);
    }

    updateMany(recs, options, cb) {

        // parse args as options by definiton are not required
        this.interface.update(recs, options).asCallback(cb);
    }

    sync(cb) {

        // this.interface.sync(options).asCallback(cb);
        this.interface.sync().asCallback(cb);
    }


};
