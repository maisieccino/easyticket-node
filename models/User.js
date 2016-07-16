'use strict';

const Model = require('objection').Model;

class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email'],
            
            properties: {
                id: { type: 'integer'},
                name: { type: 'string'},
                name_short: { type: 'string'},
                img_profile_url: { type: 'string'},
                has_profile: { type: 'boolean'},
                email: { type: 'string'},
                password_digest: { type: 'string'},
                phone: { type: 'string' }
            }
        };
    }
}

module.exports = User;
