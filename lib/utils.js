'use strict';

const SQL = require('sequelize');

const internals = {};


class DatabaseError extends Error {

    constructor(message) {

        super();
        this.message = message;
        this.name = this.constructor.name;
        // $lab:coverage:off$
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        }
        else {
            this.stack = (new Error(message)).stack;
        }
        // $lab:coverage:on$
    }
};

exports.createError = (err) => {

    const error = new DatabaseError(err.message);
    error.parent = err.parent;
    // mssql and postgres dialects producred different errors
    // $lab:coverage:off$
    if (err.error) {
        if (err.errors.length === 1) {
            error.type = err.errors[0].type;
            error.path = err.errors[0].path;
        }
        else {
            const types = [];
            const paths = [];
            for (let i = 0; i < err.errors.length; ++i) {
                const e = err.errors[i];
                types.push(e.type);
                paths.push(e.path);
            }
            error.type = types;
            error.path = paths;
        }
    };

    // $lab:coverage:on$
    error.name = err.name;
    return error;
};

exports.mergeDbOpts = (options, original) => {

    const result = Object.assign({}, options, original);
    return result;
};


exports.parseOptions = (options) => {

    const dbs = {};
    const keys = Object.keys(options.dbs);
    for (let i = 0; i < keys.length; ++i) {

        const db = keys[i];
        dbs[db] = {
            options: options.dbOpts,
            tables: {}
        };

        dbs[db].options = exports.mergeDbOpts(dbs[db].options, options.dbs[db]);

        const tables = Object.keys(options.dbs[db].tables);
        for (let j = 0; j < tables.length; ++j) {

            const table = tables[j];
            dbs[db].tables[table] = exports.createModels(options.dbs[db].tables[table]);
        }
    }
    return dbs;
};


exports.createModels = (tableSchema) => {

    const definition = {};
    const fieldNames = Object.keys(tableSchema);
    const options = {
        timestamps: false
    };

    for (let i = 0; i < fieldNames.length; ++i) {

        const fieldName = fieldNames[i];
        definition[fieldName] = {
            allowNull: false,
            autoIncrement: false,
            timestamps: false,
            primaryKey: false
        };

        const field = tableSchema[fieldName];

        if (fieldName === 'xx_created_dt') {
            options.timestamps = true;
            options.createdAt = fieldName;
        }

        if (fieldName === 'xx_modified_dt') {
            options.updatedAt = fieldName;
            options.timestamps = true;
        }

        if (field.type === 'string') {
            definition[fieldName].type = field.length ? SQL.STRING(field.length) : SQL.STRING;
        }

        if (field.type === 'text') {
            definition[fieldName].type = SQL.TEXT;
        }

        if (field.type === 'integer') {
            definition[fieldName].type = SQL.INTEGER;
        }

        if (field.type === 'datetime') {
            definition[fieldName].type = field.length ? SQL.DATE(field.length) : definition[fieldName].type = SQL.DATE;
        }

        if (field.type === 'decimal') {
            definition[fieldName].type = SQL.DECIMAL;
        }

        if (field.type === 'double') {
            definition[fieldName].type = SQL.DOUBLE;
        }

        if (field.type === 'boolean') {
            definition[fieldName].type = SQL.BOOLEAN;
        }

        if (field.type === 'float') {
            definition[fieldName].type = SQL.FLOAT;
        }

        if (field.autoIncrement) {
            definition[fieldName].autoIncrement = true;
        }

        if (field.primaryKey) {
            definition[fieldName].primaryKey = true;
        }

        if (field.allowNull) {
            definition[fieldName].allowNull = true;
        }

        if (field.timestamp) {
            definition[fieldName].timestamps = true;
        }

    };

    return {
        definition,
        options
    };

};
