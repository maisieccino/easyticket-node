/* jshint esversion: 6 */
/* jshint node: true */
"use strict";

const ApiKey = require('./models/ApiKey');

module.exports = function* (next) {
    var apiKey = this.query.api_key;

    if (typeof(apiKey) === "undefined") {
        this.throw('{ error: "No API key provided"}', 401);
    }
    const key = yield ApiKey
        .query()
        .findById(apiKey);

    if (typeof(key) === "undefined") {
        this.throw('{ error: "This API key does not exist"}', 401);
    }

    this.set('X-Auth-Level', key.authority_level);

    yield next;

};
