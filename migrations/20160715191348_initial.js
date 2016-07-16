exports.up = function(knex) {
    return knex.schema
        .createTable('user', function (table) {
            table.bigIncrements('id').unsigned().primary();
            table.string('name').notNullable();
            table.string('name_short');
            table.string('img_profile_url');
            table.boolean('has_profile').defaultTo(false).notNullable();
            table.string('email').notNullable().unique();
            table.string('password_digest');
        })
        .createTable('organisation', function (table) {
            table.bigIncrements('id').unsigned().primary();
            table.string('name').notNullable();
            table.string('description');
            table.string('website');
            table.string('email');
            table.string('facebook');
            table.string('twitter');
            table.string('img_logo_url');
            table.string('img_banner_url');
        })
        .createTable('venue', function (table) {
            table.bigIncrements('id').unsigned().primary();
            table.string('name').notNullable();
            table.string('description');
            table.string('img_banner_url');
            table.json('address');
        })
        .createTable('event', function(table) {
            table.bigIncrements('id').unsigned().primary();
            table.string('name').notNullable();
            table.string('description');
            table.dateTime('datetime_start').notNullable();
            table.dateTime('datetime_end').notNullable();
            table.string('img_logo_url');
            table.string('img_banner_url');
            table.bigInteger('venue').unsigned().notNullable().references('id').inTable('venue');
            table.bigInteger('organisation').unsigned().notNullable().references('id').inTable('organisation');
        })
        .createTable('event_category', function (table) {
            table.bigIncrements('id').unsigned().primary();
            table.string('name').notNullable();
            table.string('img_url');
            table.string('description');
        })
        .createTable('event_event_category', function (table) {
            table.bigInteger('event').unsigned().notNullable();
            table.bigInteger('event_category').unsigned().notNullable();
            table.index(['event', 'event_category'], 'event_event_category_index');
        })
        .createTable('ticket_tier', function (table) {
            table.bigIncrements('id').unsigned().primary();
            table.string('name').notNullable();
            table.decimal('cost',2).defaultTo(0.00);
            table.string('description');
            table.bigInteger('quantity').unsigned().notNullable();
            table.bigInteger('event').unsigned().notNullable().references('id').inTable('event');
        })
        .createTable('ticket', function (table) {
            table.bigIncrements('id').unsigned().primary();
            table.string('qr_code_val').unique();
            table.bigInteger('tier').unsigned().notNullable().references('id').inTable('ticket_tier');
        })
        .createTable('org_user', function (table) {
            table.bigIncrements('id').unsigned().primary();
            table.bigInteger('user_id').unsigned().references('id').inTable('user');
            table.bigInteger('org_id').unsigned().references('id').inTable('organisation');
        })
        .createTable('admin_user', function (table) {
            table.bigIncrements('id').unsigned().primary();
            table.integer('user_id').unsigned().unique().references('id').inTable('user');
        });
};

exports.down = function(knex) {

};
