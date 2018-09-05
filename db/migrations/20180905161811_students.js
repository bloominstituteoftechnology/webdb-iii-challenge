exports.up = (knex, Promise) => {
  return knex.schema.createTable('students', t => {
    t.increments();
    t.string('name').notNullable();
    t.integer('cohort_id').references('cohorts.id');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('students');
};
