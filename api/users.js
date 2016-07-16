var utils = require('./utils');

const transaction = require('objection').transaction;
const User = require('../models/User');

module.exports = function(app) {
    app.get('/users/:id', function* (req, res) {
        const user = yield User
            .query()
            .findById(req.params.id);
        
        if (typeof(user) === 'undefined') {
            utils.throwNotFound();
        }

        res.send(user);
    });
};
