exports.up = function(knex, Promise) {
    returns knex.schema
        .createTable('user', function(table) {
            table.bigincrements('id').primary();
            table.string('name').notNullable();
            table.string('name_short');
            table.string('img_profile_url');
            table.boolean('has_profile').defaultTo(false).notNullable();
            table.string('email').notNullable().unique();
            table.string('password_digest');
        })
        .createTable('org_user', function(table) {
            table.bigincrements('id').primary();
            table.bigInteger('user_id').unique().inTable('user').references('id');
            table.bigInteger('org_id').unique().inTable('organisations').references('id');
        })
        .createTable('event', function(table) {
            table.bigincrements('id').primary();
            table.string('name').notNullable();
            table.description('description');
            table.datetime('datetime_start').notNullable();
            table.datetime('datetime_end').notNullable();
            table.string('img_logo_url');
            table.string('img_banner_url');
        });
};

exports.down = function(knex, Promise) {

};
