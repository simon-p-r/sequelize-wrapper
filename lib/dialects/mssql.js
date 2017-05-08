'use strict';


// return an array of end user database names, filtering out system names
// ***RAW SQL*** - SELECT name FROM master.dbo.sysdatabases
exports.getDatabaseNames = (options, cb) => {




};


// create a database using master or system db
// ***RAW SQL*** - Create database <name>
exports.createDatabase = (options, cb) => {


};



// drop a database using master or system db
exports.dropDatabase = (options, cb) => {



};

exports.getDbs = 'SELECT name FROM master.dbo.sysdatabases';

exports.createDb = (name) => {

    return `CREATE DATABASE ${name}`;
};
