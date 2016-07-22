'use strict';

const Model         = require('objection').Model;
const Venue         = require('./Venue');
const Organisation  = require('./Organisation');

class Event extends Model {
    static get tableName() {
        return 'event';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'name',
                'datetime_start',
                'datetime_end',
                'venue',
                'organisation'
            ],

            properties: {
                id: { type: 'integer'},
                name: { type: 'string'},
                description: { type: 'string' },
                datetime_start: { type: 'Date' },
                datetime_end: { type: 'Date' },
                img_logo_url: { type: 'string' },
                img_banner_url: { type: 'string' },
            }
        };
    }

    static get relationMappings() {
        return {
            venue: {
                relation: Model.HasOneRelation,
                modelClass: Venue,
                join: {
                    from: 'event.venue',
                    to: 'venue.id'
                }
            },
            organisation: {
                relation: Model.HasOneRelation,
                modelClass: Organisation,
                join: {
                    from: 'event.organisation',
                    to: 'organisation.id'
                }
            }
        }
    }
}

module.exports = Event;

