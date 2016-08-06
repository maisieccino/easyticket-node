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

    router.post('/', function* (req, res) {
        console.log(req.body);
        const org = yield Org
            .query()
            .insertAndFetch(req.body);

        res.send(org);
    });

    router.get('/:id', function* (req, res) {
        const org = yield Org
            .query()
            .findById(req.params.id)
            .eager('users.user');
        if (!org) {
            utils.throwNotFound();
        }

        res.send(org);
    });

    // GET a list of users that belong to an organisation.
    router.get('/:id/users', function* (req, res) {
        const org = yield Org
            .query()
            .findById(req.params.id);

        if (!org)
            utils.throwNotFound();

        const users = yield org
            .$relatedQuery('users')
            .eager('user');

        if (!users.length)
            res.status(204).send(users);
        else
            res.send(users);
    });

    // GET a list of events that belong to an organisation.
    router.get('/:id/events', function* (req, res) {
        const events = yield Event
            .query()
            .where('organisation', '=', req.params.id)
            .omit(['organisation'])
            .eager('venue');

        res.status(events.length? 200 : 204).send(events);
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
};
