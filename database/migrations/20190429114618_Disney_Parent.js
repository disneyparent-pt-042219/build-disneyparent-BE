exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('family', function(family) {
            family.increments();
            family
                .string('username', 128)
                .notNullable()
                .unique();
            family
                .string('password', 128)
                .notNullable();
        })

    /*.createTable('posts', function(posts) {
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
    });*/
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('family');
};