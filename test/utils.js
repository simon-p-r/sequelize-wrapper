'use strict';


exports.getOpts = () => {

    return {
        dbOpts: {
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: process.env.PGPASSWORD,
            dialect: 'postgres',
            logging: false,
            sync: true,
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        },
        dbs: {
            test_db: {
                tables: {
                    product: {
                        name: {
                            type: 'text',
                            primaryKey: true,
                            length: 255
                        },
                        price: {
                            type: 'decimal'
                        },
                        quantity: {
                            type: 'integer'
                        },
                        xx_created_dt: {
                            type: 'datetime',
                            timestamp: true
                        },
                        xx_modified_dt: {
                            type: 'datetime',
                            timestamp: true
                        }
                    }
                }
            },
            test_db2: {
                tables: {
                    country: {
                        name: {
                            type: 'text',
                            primaryKey: true
                        },
                        capital_city: {
                            type: 'string'
                        },
                        language: {
                            type: 'string',
                            length: 255,
                            allowNull: true
                        },
                        timezone: {
                            type: 'datetime',
                            length: 2
                        },
                        latitude: {
                            type: 'double'
                        },
                        longitude: {
                            type: 'double'
                        },
                        eu_member:{
                            type: 'boolean'
                        },
                        pop_density_percent: {
                            type: 'float'
                        },
                        counter: {
                            type: 'integer',
                            autoIncrement: true
                        }
                    }
                }
            }
        }
    };
};

exports.records = [
    {
        name: 'Battery',
        price: 19.99,
        quantity: 1000
    },
    {
        name: 'Keyboard',
        price: 19.99,
        quantity: 500
    },
    {
        name: 'CPU',
        price: 199.99,
        quantity: 45
    },
    {
        name: 'LED',
        price: 4.99,
        quantity: 15000
    }
];
