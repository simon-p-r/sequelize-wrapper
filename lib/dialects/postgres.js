'use strict';

// return an array of end user database names, filtering out
exports.getDatabaseNames = (options, cb) => {




};


// create a database using postgres system db
exports.createDatabase = (options, cb) => {


};

// drop a database usign postgres system db
exports.dropDatabase = (options, cb) => {



};


exports.masterDB = 'postgres';

exports.getDbs = 'SELECT datname FROM pg_database;';

exports.createDb = (name) => {

    return `CREATE DATABASE ${name}`;
};







