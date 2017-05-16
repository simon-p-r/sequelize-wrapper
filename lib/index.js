'use strict';

const Async = require('neo-async');
const Joi = require('joi');

const Db = require('./db');
const Schema = require('./schema');
const Utils = require('./utils');

const internals = {};


module.exports = class MgrInterface {

    constructor(options) {

        // validate options object then init constructor
        // contain object keys being db names and value being object with keys being table names and value being the schema defining them with sequelizejs
        options = Joi.attempt(options, Schema.options);
        this._settings = Utils.parseOptions(options);
        this.dbs = {};
        this._dbNames = [];
        const dbNames = Object.keys(this._settings);
        for (let i = 0; i < dbNames.length; ++i) {

            const dbName = dbNames[i];
            this._dbNames.push(dbName);
            const dbOpts = this._settings[dbName].options;
            const tables = this._settings[dbName].tables;
            this.dbs[dbName] = new Db(dbName, tables, dbOpts);
        }
    };


    connect(cb) {

        const iterator = (item, next) => {

            const db = this.dbs[item];
            db.connect(next);
        };

        Async.map(this._dbNames, iterator, (err, result) => {

            if (err) {
                return cb(err, null);
            }

            return cb(null);
        });

    }

    close(cb) {

        const iterator = (item, next) => {

            const db = this.dbs[item];
            db.sql.close();
            next();
        };

        Async.map(this._dbNames, iterator, (err) => {

            // $lab:coverage:off$
            if (err) {
                return cb(err, null);
            }
            // $lab:coverage:on$

            return cb(null);
        });

    }

    getDbNames() {

        return Object.keys(this.dbs);
    }

    getTableNames(name) {

        if (this.dbs[name]) {
            return Object.keys(this.dbs[name].tables);
        }
        return [];
    }

    getTableSchema(dbName, tableName) {

        if (this._settings[dbName]) {
            return this._settings[dbName].tables[tableName];
        }
        return [];

    }

};

