/*jshint esversion: 6 */
/*jshint node: true */
"use strict";

const fs = require('fs');
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

// body parser
app.use(require('koa-bodyparser')({
    strict: true
}));

const publicKey = fs.readFileSync('key.rsa.pub');
const privateKey = fs.readFileSync('key.rsa');

// error handling and jsonifying
app.use(function* (next) {
    try {
        yield next;
        try {
            this.body = JSON.stringify(this.body, '\t', 2);
        }
        catch (e) {
        }
    }
    catch (err) {
        this.status = err.status || 500;
        this.body = err.message;
    }

    // Debug for log
    console.log (this.method + ' ' + this.path + ' - ' + this.status);
});

// Register our REST API
require('./api')(app);

module.exports = app;
