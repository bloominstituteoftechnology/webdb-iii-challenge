exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', (tbl) => {
    tbl.increments();

    tbl
      .string('tag', 16)
      .notNullable()
      .unique('tag');

    tbl.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
