/*jshint esversion: 6 */
/*jshint node: true */
"use strict";

const crypto = require('crypto');

const Model = require('objection').Model;

class ApiKey extends Model {
    static get tableName() {
        return 'api_key';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [
                'key',
                'app_name',
                'author_name',
                'author_email',
                'authority_level'
            ],

            properties: {
                key: { type: 'string' },
                limit: { type: 'integer' },
                app_name: { type: 'string' },
                app_description: { type: 'string' },
                author_name: { type: 'string' },
                author_email: { type: 'string' },
                callback_url: { type: 'string' },
                authority_level: { type: 'integer' }
            }
        }
    }

    static generateKey() {
        return crypto.randomBytes(20).toString('hex');
    }
}

module.exports = ApiKey;
