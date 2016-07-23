'use strict';

const Model = require('objection').Model;

class Venue extends Model {
    static get tableName() {
        return 'venue';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ 'name' ],

            properties: {
                id: { type: 'integer'},
                name: { type: 'string'},
                description: { type: 'string' },
                img_banner_url: { type: 'string'},
                address: { type: 'json' }
            }
        };
    }

    static get relationMappings() {
        return {
            events: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Event',
                join: {
                    from: "venue.id",
                    to: "event.venue"
                }
            }
        };
    }
}

module.exports = Venue;
