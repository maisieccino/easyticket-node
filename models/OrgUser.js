'use strict';

const Model         = require('objection').Model;
const User          = require('./User');
const Organisation  = require('./Organisation');

class OrgUser extends Model {
    static get tableName() {
        return 'org_user';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ 'user_id', 'org_id' ],

            properties: {
                id: { type: 'integer'},
                user_id: { type: 'integer' }
            }
        };
    }

    static get relationMappings() {
        return {
            organisation: {
                relation: Model.BelongsToOneRelation,
                modelClass: Organisation,
                join: {
                    from: 'org_user.org_id',
                    to: 'organisation.id'
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'org_user.user_id',
                    to: 'user.id'
                }
            }
        };
    }
}

module.exports = OrgUser;

