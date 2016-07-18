'use strict';

const transaction = require('objection').transaction;

module.exports = function (app) {

    // users API.
    require('./api/users')(app);


    app.get('/', function (req, res) {
        res.send('hey');
    });
};
