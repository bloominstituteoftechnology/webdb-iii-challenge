
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Will Smith', cohorts_id: 1112 },
        { name: 'Cristiano Ronaldo', cohorts_id: 1113 },
        { name: 'Elon Musk', cohorts_id: 1114 }
      ]);
    });
};
