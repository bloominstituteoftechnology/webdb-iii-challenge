exports.up = function(knex, Promise) {
return knex.schema.createTable("users", tbl => {
    tbl.increments("id");
    tbl
    .string("user_name", 255)
        .notNullable()
    tbl.timestamp("create_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};

