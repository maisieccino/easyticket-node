'use esversion: 6';
var utils = require('./utils');

const Promise       = require('bluebird');
const transaction   = require('objection').transaction;
const Org           = require('../models/Organisation');
const OrgUser       = require('../models/OrgUser');
const Event         = require('../models/Event');

module.exports = function(app) {

    app.post('/org', function* (req, res) {
        console.log(req.body);
        const org = yield Org
            .query()
            .insertAndFetch(req.body);

        res.send(org);
    });

    app.get('/org/:id', function* (req, res) {
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
    app.get('/org/:id/users', function* (req, res) {
        const org = yield Org
            .query()
            .findById(req.params.id);

        if (!org)
            utils.throwNotFound();

        const users = yield org
            .$relatedQuery('users')
            .eager('user');

        if (users.length == 0)
            res.status(204).send(users);
        else
            res.send(users);
    });

    // GET a list of events that belong to an organisation.
    app.get('/org/:id/events', function* (req, res) {
        const events = yield Event
            .query()
            .where('organisation', '=', req.params.id)
            .omit(['organisation'])
            .eager('venue');

        res.status(events.length? 200 : 204).send(events);
    });
};
