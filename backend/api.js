/*jshint esversion: 6 */
/*jshint node: true */
"use strict";

const transaction = require('objection').transaction;

module.exports = function (app) {
    // users API.
    require('./api/user')(app);

    // events API.
    require('./api/event')(app);

    // org API.
    require('./api/org')(app);

    // venue API.
    require('./api/venue')(app);

};
