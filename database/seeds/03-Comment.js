const commentData = require('../data/comment_data');

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('comments')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('comments')
                .insert(commentData);
        });
};