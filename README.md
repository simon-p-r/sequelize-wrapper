# sequelize-wrapper
[![build status](https://travis-ci.org/simon-p-r/sequelize-wrapper.svg?branch=master)](https://travis-ci.org/simon-p-r/sequelize-wrapper)
[![Windows Build status](https://ci.appveyor.com/api/projects/status/esyqmk1osp7n7om0?svg=true)](https://ci.appveyor.com/project/simon-p-r/sequelize-wrapper)

[![Current Version](https://img.shields.io/npm/v/sequelize-wrapper.svg?maxAge=1000)](https://www.npmjs.com/package/sequelize-wrapper)
[![dependency Status](https://img.shields.io/david/simon-p-r/sequelize-wrapper.svg?maxAge=1000)](https://david-dm.org/simon-p-r/sequelize-wrapper)
[![devDependency Status](https://img.shields.io/david/dev/simon-p-r/sequelize-wrapper.svg?maxAge=1000)](https://david-dm.org/simon-p-r/sequelize-wrapper?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/simon-p-r/sequelize-wrapper/badge.svg?branch=master)](https://coveralls.io/github/simon-p-r/sequelize-wrapper?branch=master)


Nodejs callback wrapper for Sequelize because using asCallback is error prone and every library should support callbacks as standard 

### Not currently fit for public consumption


#### API

##### new Manager(options);

options object must contain the following properties
+ dbOpts - object that can be passed to Sequelize module
+ dbs - object with keys being name of database to create or use, the value of object is an object with tables and dbOpts as property.  The tables property defines the tables for relevant database and their schema whilst the dbOpts is the same as top level key encase you need to use a different database form the main declared one via an override.

##### Methods on constructor

##### .connect(schemas)

+ method to connect to database, callback has one param error if one occurred



##### .close(callback)

+ method to clean-up connection to database, as above callback has one param if an error occurs


##### Methods on properties of constructed object

+ .dbs[dbName].tables[modelName].find(options, cb); - callback wrapped for Sequelize findAll method
+ .dbs[dbName].tables[modelName].findById(options, cb); - callback wrapped for Sequelize findById method
+ .dbs[dbName].tables[modelName].findOne(options, cb); - callback wrapped for Sequelize findOne method
+ .dbs[dbName].tables[modelName].count(options, cb); - callback wrapped for Sequelize count method
+ .dbs[dbName].tables[modelName].insertOne(record, options, cb); - callback wrapped for Sequelize create method
+ .dbs[dbName].tables[modelName].insertMany(records, options, cb); - callback wrapped for Sequelize bulkCreate method
+ .dbs[dbName].tables[modelName].deleteMany(options, cb); - callback wrapped for Sequelize destroy method
<!--+ .dbs[dbName].tables[modelName].deleteOne(options, cb); - callback wrapped for Sequelize destroy method with limit set to 1-->
+ .dbs[dbName].tables[modelName].deleteById(options, cb); - callback wrapped for Sequelize destroy method with where query for id set
<!--+ .dbs[dbName].tables[modelName].updateOne(record, options, cb); - callback wrapped for Sequelize update method with limit set to 1-->
+ .dbs[dbName].tables[modelName].updateMany(records, options, cb); - callback wrapped for Sequelize update method with where query for id set
+ .dbs[dbName].tables[modelName].drop(options, cb); - callback wrapped for Sequelize drop method, this will destroy the table completely

#### Todo
+ ~~add tests~~
+ add CI with travis and appveyor
+ improve docs
+ clean up functionality
+ improve method validation


