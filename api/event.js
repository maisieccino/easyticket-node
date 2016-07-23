'use esversion: 6';
var utils = require('./utils');

const transaction = require('objection').transaction;
const Event = require('../models/Event');

module.exports = function(app) {

    app.get('/event/:id', function* (req, res) {
        const event = yield Event
            .query()
            .findById(req.params.id);
        if (!event) {
            utils.throwNotFound();
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
            })

        res.send(event);
    });

    // GET an event's ticket tiers.
    // TODO: Add ticket quantity remaining.
    app.get('/event/:id/tiers', function* (req, res) {
        const event = yield Event
            .query()
            .findById(req.params.id);

        const tiers = yield event
            .$relatedQuery('ticket_tiers');

        res.status(tiers.length? 200 : 204).send(tiers);
    });
};
