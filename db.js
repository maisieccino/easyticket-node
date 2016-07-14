var config = require('./config');

module.exports = require('knex')({
    client: 'pg',
    connection: {
        host: config.db.host,
        user: config.db.user,
        password: config.db.pass,
        database: config.db.dbname
    }
})
