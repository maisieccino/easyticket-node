'use strict';

const Model = require('objection').Model;

class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email', 'phone']
        }
    }
}

module.exports = User;
