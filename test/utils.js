'use strict';


exports.getOpts = () => {

    return {
        dbOpts: {
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'Luca2010',
            dialect: 'postgres',
            logging: false,
            sync: false,
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        },
        dbs: {
            test_demo: {
                tables: {
                    user: {
                        name: {
                            type: 'text'
                        },
                        surname: {
                            type: 'text'
                        },
                        age: {
                            type: 'integer'
                        },
                        street: {
                            type: 'text'
                        },
                        city: {
                            type: 'text'
                        },
                        postal_code: {
                            type: 'text'
                        }
                    },
                    product: {
                        id: {
                            type: 'integer',
                            primaryKey: true
                        },
                        name: {
                            type: 'text'
                        }
                        // price: {
                        //     type: 'decimal'
                        // }
                    }
                }
            },
            aim_ops_db: {
                tables: {
                    country: {
                        name: {
                            type: 'text',
                            primaryKey: true
                        },
                        population: {
                            type: 'integer'
                        }
                    },
                    state: {
                        name: {
                            type: 'text',
                            primaryKey: true
                        },
                        population: {
                            type: 'integer'
                        },
                        // longitutde: {
                        //     type: 'double'
                        // },
                        // latitude: {
                        //     type: 'double'
                        // },
                        country: {
                            type: 'text'
                        }
                    }
                }
            }
        }
    };
};

