
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohort', tbl => {
      tbl.increments();
      tbl.string('name')
        .notNullable();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohort');
};
