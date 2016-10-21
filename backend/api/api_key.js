/*jshint esversion: 6 */
/*jshint node: true */
"use strict";

var Router = require('koa-router');

var utils = require('./utils');

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

    app.use(router.routes());
    app.use(router.allowedMethods());
};
