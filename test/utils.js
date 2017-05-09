'use strict';


exports.getOpts = () => {

    return {
        dbOpts: {
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: process.env.DB_PASSWORD,
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
                            primaryKey: true
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
