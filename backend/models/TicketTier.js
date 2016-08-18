'use strict';

const Model = require('objection').Model;
const Event = require('./Event');

class TicketTier extends Model {
    static get tableName() {
        return 'ticket_tier';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'name',
                'quantity',
                'event'
            ],

            properties: {
                id: { type: 'integer'},
                name: { type: 'string'},
                description: { type: 'string' },
                cost: { type: 'decimal' },
                quantity: { type: 'integer' },
            }
        };
    }

    static get relationMappings() {
        return {
            event: {
                relation: Model.BelongsToOneRelation,
                modelClass: Event,
                join: {
                    from: 'ticket_tier.event',
                    to: 'event.id'
                }
            },
        };
    }
}

module.exports = TicketTier;
