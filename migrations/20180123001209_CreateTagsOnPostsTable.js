exports.up = function(knex, Promise) {
  //creates the users table
  //runs when we execute the migration
  return knex.schema.createTable("tagsOnPosts", tbl => {
    tbl.primary().increments();
    tbl
      .integer("postId")
      .references("id")
      .inTable("posts");
    tbl
      .integer("tagId")
      .references("id")
      .inTable("tags");
    tbl.timestamp("created_At").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  //deletes the users table
  //runs when rolling back migration
  return knex.schema.dropTableIfExists("tagsOnPosts");
};
