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
};
