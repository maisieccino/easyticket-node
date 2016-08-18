exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('user').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('user').insert({
                    id: 1,
                    name: 'John Smith',
                    name_short: 'John',
                    has_profile: false,
                    email: 'john@example.com',
                    phone: '01189 998819'
                }),
            ]);
        });
};
