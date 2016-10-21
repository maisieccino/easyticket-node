/*jshint esversion: 6 */
/*jshint node: true */
"use strict";

var Router = require('koa-router');

var utils = require('./utils');
var keyCheck = require('../keyCheck');

const transaction = require('objection').transaction;
const ApiKey = require('../models/ApiKey');

module.exports = function (app) {

    var router = new Router({
        prefix: '/api/key'
    });

    router.get('/genkey', function (req, res) {
        this.body = ApiKey.generateKey();
    });

    router.get('/init', function* () {
        var originIp = this.request.headers["X-Orig-IP"];
        //TODO: Block IPs that aren't in config file.
        var key = ApiKey.generateKey();

        // Check to see if key allocated.
        const findMasterKey = yield ApiKey
            .query()
            .where('authority_level', '=', '0');

        if (findMasterKey.length) {
            this.throw('{error: "Master key already allocated."}', 401);
        }

        const masterKey = yield ApiKey
            .query()
            .insert({
                key: key,
                limit: -1,
                app_name: "Master",
                app_description: "Master key for this EasyTicket installation.",
                author_name: this.query.name,
                author_email: this.query.email,
                authority_level: 0
            });

            this.body = masterKey;
    });

    router.post('/create', keyCheck, function* () {
        var authLevel = parseInt(this.response.headers['x-auth-level']);

        if (authLevel > 1) {
            this.throw('{ error: "You do not have permission to grant API keys."}', 403);
        }

        if (this.request.body.limit > 500 && authLevel > 0) {
            this.throw('{ error: "Rate limit must be less than 500 requests per hour."}', 401);
        }

        if (this.request.body.authority_level <= authLevel) {
            this.throw('{ error: "You do not have permission to create a key with that authority"}', 403);
        }

        this.request.body.key = ApiKey.generateKey();
        this.request.body.limit = this.request.body.limit || 500;

        const key = yield ApiKey
            .query()
            .insert(this.request.body);

        this.body = key;
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
};
