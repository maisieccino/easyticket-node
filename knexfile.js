// Update with your config settings.

var config = require('./config');

module.exports = {

    development: {
        client: 'postgresql',
        connection: {
            host: config.db.host,
            user: config.db.user,
            password: config.db.pass,
            database: config.db.dbname
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            host: config.db.host,
            user: config.db.user,
            password: config.db.pass,
            database: config.db.dbname
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            host: config.db.host,
            user: config.db.user,
            password: config.db.pass,
            database: config.db.dbname
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
