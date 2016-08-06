/*jshint esversion: 6 */
/*jshint node: true */
"use strict";

const _ = require('lodash');
const koa = require('koa');
const Knex = require('knex');
const morgan = require('morgan');
const knexConfig = require('./knexfile');
const Model = require('objection').Model;

// Initialize knex.
const knex = Knex(knexConfig.development);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.
Model.knex(knex);

// const app = express()
//   .use(bodyParser.json())
//   .use(morgan('dev'))
//   .set('json spaces', 2);

const app = koa();

app.use(function* (next) {
    try {
        yield next;
        var body = this.body;
        if (JSON.parse(body)) {
            this.body = JSON.stringify(body, '\t', 2);
        }
    }
    catch (err) {
        this.status = err.error || 500;
        this.body = err.message;
    }
});

// Register our REST API
require('./api')(app);

module.exports = app;
