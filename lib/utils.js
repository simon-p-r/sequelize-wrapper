'use strict';

const SQL = require('sequelize');

const internals = {};



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
    for (let i = 0; i < fieldNames.length; ++i) {

        const fieldName = fieldNames[i];
        definition[fieldName] = {
            allowNull: false,
            autoIncrement: false,
            timestamp: false,
            primaryKey: false
        };

        const field = tableSchema[fieldName];

        if (field === 'xx_created_dt') {
            definition[fieldName].createdAt = field;
        }

        if (field === 'xx_modified_dt') {
            definition[fieldName].updatedAt = field;
        }

        if (field.type === 'string') {
            definition[fieldName].type = field.length ? SQL.STRING(field.length) : SQL.STRING;
        }

        if (field.type === 'text') {
            definition[fieldName].type = field.length ? SQL.TEXT(field.length) : SQL.TEXT;
        }

        if (field.type === 'integer') {
            definition[fieldName].type = field.length ? SQL.INTEGER(field.length) : SQL.INTEGER;
        }

        if (field.type === 'datetime') {
            definition[fieldName].type = field.length ? SQL.DATE(field.length) : definition[fieldName].type = SQL.DATE;
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
            definition[fieldName].timestamp = true;
        }

    }

    return definition;

};
