'use strict';

const MsSQL = require('./mssql');
const Postgres = require('./postgres');

const createDb = (name) => {

    return `CREATE DATABASE ${name}`;
};


MsSQL.createDb = createDb;
Postgres.createDb = createDb;

module.exports = {
    mssql: MsSQL,
    postgres: Postgres
};
