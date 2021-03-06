exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('posts', function(posts) {
            posts.increments();

            posts
                .integer('family_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('family')
                .onDelete("CASCADE")
                .onUpdate("CASCADE");

            posts
                .text('attraction', 128)
                .notNullable();

            posts
                .text('num_of_children')
                .notNullable();

            posts
                .text('meetup_time')
                .notNullable();

            posts
                .text('meetup_date')
                .notNullable();

            posts
                .text('message')
                .notNullable();

            posts
                .timestamps(true, true);
        });

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};