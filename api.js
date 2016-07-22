'use strict';

const transaction = require('objection').transaction;

module.exports = function (app) {

    // users API.
    require('./api/user')(app);
    require('./api/event')(app);
    require('./api/org')(app);


    app.get('/', function (req, res) {
        res.send('hey');
    });
};
