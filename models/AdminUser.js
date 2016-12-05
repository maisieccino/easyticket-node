/*jshint esversion: 6 */
/*jshint node: true */
"use strict";

const Model         = require('objection').Model;
const User          = require('./User');

class AdminUser extends User {
    static get tableName() {
        return 'admin_user';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ 'user_id' ],

            properties: {
                id: { type: 'integer'},
                user_id: { type: 'integer' }
            }
        };
    }
}

module.exports = AdminUser;
