'use esversion: 6';
var utils = require('./utils');

const Promise       = require('bluebird');
const transaction   = require('objection').transaction;
const Venue         = require('../models/Venue');
const Event        = require('../models/Event');

module.exports = function(app) {

    // GET all venues. (limited to 20)
    app.get('/venue', function* (req, res) {
        const venues = yield Venue
            .query()
            .limit(20);

        if (!venues)
            throw utils.throwNotFound();

        res.send(venues);
    });

    // GET a venue by id.
    app.get('/venue/:id', function *(req, res) {
        const venue = yield Venue
            .query()
            .findById(req.params.id);

        if (!venue)
            throw utils.throwNotFound();

        res.send(venue);
    });

    // GET a list of events happening at a venue.
    // TODO: allow filtering by date.
    app.get('/venue/:id/events', function* (req, res) {
        const events = yield Event
            .query()
            .where('venue', '=', req.params.id)
            .limit(20);

        // Send a 204 EMPTY RESPONSE if there's no events.
        // Otherwise send 200 OK.
        res.status(events.length? 200 : 204).send(events);
    });
};
