const parentData = require('../data/parent_data');

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('family')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('family')
                .insert(parentData);
        });
};