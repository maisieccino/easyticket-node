exports.seed = function(knex, Promise) {
    return Promise.all([
        // Inserts seed entries
        knex('organisation').insert({
            name: "TechSoc",
            description: "UCLU Technology Society",
            website: "techsoc.io",
            email: "president@techsoc.io",
            facebook: "uclutechsoc",
            twitter: "uclutech"
        }),

        knex('venue').insert({
            name: "UCL North Cloisters",
            description: "Part of the Wilkins Building",
            img_banner_url: '',
            address: {
                first_line: "Wilkins Building, UCL",
                street: "Gower Street",
                city: "London",
                postal_code: "EC1H 5AA?",
                country: "GB"
            }
        }),

        knex('event').insert({
            name: "TechSoc 10 Year Event",
            datetime_start: '2016-10-22 15:00',
            datetime_end: '2016-10-22 22:00',
            venue: 1,
            organisation: 1
        })
    ]);
};
