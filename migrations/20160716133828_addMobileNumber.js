// This migration adds the phone column
// to the user table.

exports.up = function(knex, Promise) {
    return knex.schema.table('user', function (table) {
        table.string('phone');
    });
};
 
exports.down = function(knex, Promise) {
    return knex.schema.table('user', function (table) {
        table.dropColumn('phone');
    });
};
