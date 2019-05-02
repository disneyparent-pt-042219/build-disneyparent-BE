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
        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('family');
};