'use esversion: 6';
var utils = require('./utils');

const Promise = require('bluebird');
const transaction = require('objection').transaction;
const Org = require('../models/Organisation');
const OrgUser = require('../models/OrgUser');

module.exports = function(app) {

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
};
