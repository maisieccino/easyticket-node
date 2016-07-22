'use strict';

const Model     = require('objection').Model;

class Organisation extends Model {
    static get tableName() {
        return 'organisation';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'name'
            ],

            properties: {
                id: { type: 'integer'},
                name: { type: 'string'},
                description: { type: 'string' },
                website: { type: 'string' },
                email: { type: 'string' },
                facebook: { type: 'string' },
                twitter: { type: 'string' },
                img_logo_url: { type: 'string' },
                img_banner_url: { type: 'string' }
            }
        };
    }

    static get relationMappings() {
        return {
            events: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Event',
                join: {
                    from: 'organisation.id',
                    to: 'event.organisation'
                }
            },
            users: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/OrgUser',
                join: {
                    from: 'organisation.id',
                    to: 'org_user.org_id'
                }
            }
        }
    }
}

module.exports = Organisation;

