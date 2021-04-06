
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('Tags').insert([
        {tag: 'JavaScript' },
        {tag: 'React' },
        {tag: 'Redux' },                
      ]);
    });
};