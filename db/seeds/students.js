
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, name: 'Sarah',},
        {id: 2,name:'Rowan', },
        {id: 3,name: 'Lila', }
      ]);
    });
};
