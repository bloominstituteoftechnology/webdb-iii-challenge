
exports.up = function(knex, Promise) {
    return knex.schema.createTable("posts", tbl => {
        tbl.uuid('userId').references('id').inTable('users');
        tbl.increments("id");
        tbl
        .string("posts")
        .notNullable()
        tbl.timestamp("create_at").defaultTo(knex.fn.now());
      });
    };


exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
