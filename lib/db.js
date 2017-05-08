'use strict';

const Async = require('neo-async');
const SQL = require('sequelize');

const Dialects = require('./dialects');
const Table = require('./table');

const internals = {};

internals.getOpts = (inOpts) => {

    const result = {};
    const keys = Object.keys(inOpts);
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (key !== 'username' || key !== 'password' || key !== 'createDbs') {
            result[key] = inOpts[key];
        }
    }
    return result;

};

module.exports = class DbInterface {

    constructor(name, tables, options) {

        this._settings = options;
        this._name = name;
        this.tables = {};
        this._tableNames = Object.keys(tables);
        this._tables = tables;

    };

    connect(cb) {

        const name = this._name;
        const username = this._settings.username;
        const password = this._settings.password;
        const dbOpts = internals.getOpts(this._settings);
        this.sql = new SQL(name, username, password, dbOpts);

        const adminDB = new SQL('postgres', username, password, dbOpts);
        const sql = Dialects[adminDB.getDialect()].getDbs;

        adminDB.query(sql, {}).asCallback((err, enquiry) => {

            if (err) {
                return cb(err, null);
            }

            const dbNames = enquiry[0].map((row) => {

                return row.datname;
            });

            const exists = dbNames.includes(name);

            if (!exists) {

                const createSQL = Dialects[adminDB.getDialect()].createDb(name);
                adminDB.query(createSQL, {}).asCallback((err, result) => {

                    if (err) {
                        return cb(err, null);
                    }

                    const iterator = (item, next) => {

                        const table = this._tables[item];
                        this.tables[item] = new Table(this.sql, item, table);
                        this.tables[item].sync(next);
                    };

                    Async.map(this._tableNames, iterator, (err) => {

                        if (err) {
                            return cb(err, null);
                        }

                        adminDB.close();
                        return cb(null);
                    });
                });
            }
            else {

                const iterator = (item, next) => {

                    const table = this._tables[item];
                    this.tables[item] = new Table(this.sql, item, table);
                    this.tables[item].sync(next);
                };

                Async.map(this._tableNames, iterator, (err) => {

                    if (err) {
                        return cb(err, null);
                    }

                    adminDB.close();
                    return cb(null);
                });
            }
        });

    }

};
