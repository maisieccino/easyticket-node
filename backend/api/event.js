/*jshint esversion: 6 */
/*jshint node: true */
"use strict";

var Router = require('koa-router');

var utils = require('./utils');

const transaction = require('objection').transaction;
const Event = require('../models/Event');

module.exports = function (app) {

    var router = new Router({
        prefix: '/api/event'
    });

    router.get('/:id', function* (req, res) {
        const event = yield Event
            .query()
            .findById(this.params.id);
        if (!event) {
            this.throw('{error: "event not found"}', 404);
        }

        const organisation = yield event
            .$relatedQuery('organisation')
            .then(function (org) {
                event.organisation = org? org[0] : {};
            });

        const venue = yield event
            .$relatedQuery('venue')
            .then(function (venue) {
                event.venue = venue? venue[0] : {};
        });

        this.body = event;
    });

    // GET an event's ticket tiers.
    // TODO: Add ticket quantity remaining.
    router.get('/:id/tiers', function* () {
        const event = yield Event
            .query()
            .findById(this.params.id);

        const tiers = yield event
            .$relatedQuery('ticket_tiers');

        this.status = tiers.length? 200 : 204
        this.body = tiers;
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
};
