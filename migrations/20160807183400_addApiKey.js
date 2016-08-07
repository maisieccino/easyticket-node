exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('api_key', function (table) {

        })
    ]);
};

exports.down = function(knex, Promise) {

};
