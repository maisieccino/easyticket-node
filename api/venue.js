/*jshint esversion: 6 */
/*jshint node: true */
"use strict";

const transaction  = require('objection').transaction;
const Venue        = require('../models/Venue');
const Event        = require('../models/Event');
const Router       = require('koa-router');
const utils        = require('./utils');

module.exports = function(app) {

    var router = new Router({
        prefix: "/api/venue"
    });

    // GET all venues. (limited to 20)
    router.get('/', function* () {
        const venues = yield Venue
            .query()
            .limit(20);

        if (!venues)
            throw utils.throwNotFound();

        this.body = venues;
    });

    // GET a venue by id.
    router.get('/:id', function *() {
        const venue = yield Venue
            .query()
            .findById(this.params.id);

        if (!venue)
            throw utils.throwNotFound();

        this.body = venue;
    });

    // GET a list of events happening at a venue.
    // TODO: allow filtering by date.
    router.get('/:id/events', function* () {
        const events = yield Event
            .query()
            .where('venue', '=', this.params.id)
            .limit(20);

        // Send a 204 EMPTY RESPONSE if there's no events.
        // Otherwise send 200 OK.
        this.status = events.length? 200 : 204;
        this.body = events;
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
};
