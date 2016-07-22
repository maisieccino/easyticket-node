'use esversion: 6';
var utils = require('./utils');

const transaction = require('objection').transaction;
const User = require('../models/User');

module.exports = function(app) {
    app.get('/user/count', function* (req, res) {
        const count = yield User
            .query();

        res.send({count: count.length});
    });

    app.get('/user/:id', function* (req, res) {
        const user = yield User
            .query()
            .findById(req.params.id);

        if (typeof(user) === 'undefined') {
            utils.throwNotFound();
        }

        res.send(user);
    });
};
