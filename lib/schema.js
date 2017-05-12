'use strict';

const Joi = require('joi');

const internals = {};

internals.dbOptions = Joi.object().keys({
    host: Joi.string().required(),
    port: Joi.number().min(1).max(65535).required(),
    username: Joi.string(),
    password: Joi.string(),
    dialect: Joi.string().valid(['mysql', 'sqlite', 'postgres', 'mssql']).required(),
    pool: Joi.object().keys({
        max: Joi.number().default(5),
        min: Joi.number().default(0),
        idle: Joi.number().default(1000)
    }),
    logging: Joi.any(),
    sync: Joi.boolean(),
    dialectOptions: Joi.object(),
    instanceName: Joi.string()
}).required();

internals.schema = Joi.object().keys({
    primaryKey: Joi.boolean().default(false),
    timestamp: Joi.boolean().default(false),
    type: Joi.string().valid(['string', 'integer', 'datetime', 'text', 'double', 'decimal', 'boolean', 'float']).required(),
    allowNull: Joi.boolean().default(false),
    autoIncrement: Joi.boolean().default(false),
    length: Joi.number().default(null)
});

internals.definition = Joi.object().keys({

}).min(1).pattern(/^[a-z0-9-_]+$/i, internals.schema);


internals.table = Joi.object().keys({
    tables: Joi.object().keys({

    }).min(1).pattern(/^[a-z0-9-_]+$/i, internals.definition),
    dbOpts: Joi.object().keys({
        host: Joi.string().required(),
        port: Joi.number().min(1).max(65535).required(),
        username: Joi.string(),
        password: Joi.string(),
        dialect: Joi.string().valid(['mysql', 'sqlite', 'postgres', 'mssql']).required(),
        pool: Joi.object().keys({
            max: Joi.number().default(5),
            min: Joi.number().default(0),
            idle: Joi.number().default(1000)
        }),
        logging: Joi.any(),
        sync: Joi.boolean(),
        dialectOptions: Joi.object(),
        instanceName: Joi.string()
    })
});


internals.dbs = Joi.object().keys({


}).min(1).pattern(/^[a-z0-9-_]+$/i, internals.table);

exports.options = Joi.object().keys({

    dbOpts: internals.dbOptions,
    dbs: internals.dbs
}).required();

