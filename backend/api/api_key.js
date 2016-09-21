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

    app.use(router.routes());
    app.use(router.allowedMethods());
};
