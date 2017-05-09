'use strict';


module.exports = class TableInterface {

    constructor(sql, tableName, model) {

        // sequelize sql object, string name of table and definition of field names and types
        this.interface = sql.define(tableName, model.definition, model.options );
        this._pk = Object.keys(this.interface.primaryKeys)[0];
    };

    find(options, cb) {

        // parse args as options by definiton are not required
        this.interface.findAll(options).asCallback(cb);
    }

    findById(id, options, cb) {

        // parse args as options by definiton are not required
        this.interface.findById(id, options).asCallback(cb);
    }

    findOne(options, cb) {

        // parse args as options by definiton are not required0
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
        Object.assign(options, { truncate:  true  });
        this.interface.destroy(options).asCallback(cb);
    }

    deleteOne(options, cb) {

        // parse args as options by definiton are not required
        options.limit = 1;
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

    // updateOne(rec, options, cb) {

    //     // parse args as options by definiton are not required
    //     options.limit = 1;
    //     this.interface.update(rec, options).asCallback(cb);
    // }

    // updateMany(recs, options, cb) {

    //     // parse args as options by definiton are not required
    //     this.interface.update(recs, options).asCallback(cb);
    // }

    update(rec, options, cb) {

        // parse args as options by definiton are not required
        this.interface.update(rec, options).asCallback(cb);
    }

    drop(options, cb) {

        this.interface.drop(options).asCallback(cb);
    }

    sync(cb) {

        // this.interface.sync(options).asCallback(cb);
        this.interface.sync().asCallback(cb);
    }


};
