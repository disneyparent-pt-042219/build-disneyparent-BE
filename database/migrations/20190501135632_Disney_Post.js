
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('posts', function(posts) {
            posts.increments();

            posts
                .integer('family_id')
                .unsigned()
                .notNullable()
                .references('username')
                .inTable('family');
            
            posts
                .text('attraction', 128)
                .notNullable();    
        
            posts
                .
                           
            posts
                .integer('number of children')
                .notNullable();

            

            posts
                .text('message')
                .notNullable();

        });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
