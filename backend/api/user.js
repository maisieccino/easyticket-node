/*jshint esversion: 6 */
/*jshint node: true */
"use strict";

var Router = require('koa-router');

var utils = require('./utils');

const transaction = require('objection').transaction;
const User = require('../models/User');

const keyCheck = require('../keyCheck');

module.exports = function(app) {
    var router = new Router({
        prefix: '/api/user'
    });
    router.get('/count', function*() {
        const count = yield User
            .query();

        this.body = {count: count.length};
    });

    router.get('/:id', keyCheck, function* () {

        if (parseInt(this.response.headers['x-auth-level']) > 2) {
            this.throw('{ error: "Not authorised" }', 403);
        };
        const user = yield User
            .query()
            .findById(this.params.id);

        if (typeof(user) === 'undefined') {
            this.throw('{error: "user not found"}', 404);
        }

        this.body = user;
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
};
