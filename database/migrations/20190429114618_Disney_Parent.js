exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('family', function(family) {
            family.increments();
            family
                .string('username')
                .notNullable()
                .unique();
        })

    .createTable('posts', function(posts) {
        posts.increments();
        posts
            .text('text')
            .notNullable();
        posts
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('username')
            .inTable('family');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts').dropTableIfExists('family');
};