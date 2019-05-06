exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('comments', function(comments) {
            comments.increments();

            comments
                .integer('post_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('posts')

            comments
                .string('username')
                .notNullable();

            comments
                .text('comment')
                .notNullable();

            comments
                .timestamps(true, true);
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('comments');
};