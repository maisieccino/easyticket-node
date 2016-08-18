/*jshint esversion: 6 */
/*jshint node: true */
"use strict";

var utils = require('./utils');

const transaction   = require('objection').transaction;
const Org           = require('../models/Organisation');
const OrgUser       = require('../models/OrgUser');
const Event         = require('../models/Event');
const Router        = require('koa-router');

module.exports = function(app) {

    var router = new Router({
        prefix: '/api/org'
    });

    router.post('/', function* () {
        console.log(this.body);
        const org = yield Org
            .query()
            .insertAndFetch(this.request.body)
            .catch(function (err) {
                throw new Error('{error: "'+err+'"}');
            });

        this.body = org;
    });

    router.get('/:id', function* () {
        const org = yield Org
            .query()
            .findById(this.params.id)
            .eager('users.user');
        if (!org) {
            utils.throwNotFound("org");
        }

        this.body = org;
    });

    // GET a list of users that belong to an organisation.
    router.get('/:id/users', function* () {
        const org = yield Org
            .query()
            .findById(this.params.id);

        if (!org)
            utils.throwNotFound();

        const users = yield org
            .$relatedQuery('users')
            .eager('user');

        if (!users.length)
            this.status = 204.
        this.body = users;
    });

    // GET a list of events that belong to an organisation.
    router.get('/:id/events', function* () {
        const events = yield Event
            .query()
            .where('organisation', '=', this.params.id)
            .omit(['organisation'])
            .eager('venue');

        this.status = events.length? 200 : 204
        this.body = events;
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
};
