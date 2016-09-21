exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('api_key', function (table) {
            table.string('key').primary().notNullable().unique();
            table.integer('limit');
            table.string('app_name').notNullable();
            table.string('app_description');
            table.string('author_name').notNullable();
            table.string('author_email').notNullable();
            table.string('callback_url');
            table.integer('authority_level').notNullable().defaultTo(0);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('api_key');
};
