
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('tags').insert([
        {tag: 'comedy'},
        {tag: 'drama'},
        {tag: 'horror'},
        {tag: 'fantasy'},
        {tag: 'action'}
      ]);
    });
};
