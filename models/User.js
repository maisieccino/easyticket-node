/* jshint esversion: 6 */
/* jshint node: true */
//
//               USER MODEL
//  ===================================
//  Defines a user. Duh.

'use strict';

const bcrypt = require('bcrypt-nodejs');

const Model = require('objection').Model;

class User extends Model {
    static get tableName() {
        return 'user';
    }

    static get idColumn() {
        return 'id';
    }

    // Executed whenever a select is performed.
    $afterGet(context) {
        // strip digest from result unless explicitly asked for.
        if (!(context.type === 'password')) {
            this.$omit('password_digest');
        }

        // strip sensitive information from result unless explicitly asked for.
        if (!(context.type === 'sensitive')) {
            this.$omit(['email','phone']);
        }
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

    static hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }
}

module.exports = User;
