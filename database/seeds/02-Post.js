const postData = require('../data/post_data');

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('posts')
        .truncate()
        .then(function() {
            // Inserts seed entries
            return knex('posts')
                .insert(postData);
        });
};