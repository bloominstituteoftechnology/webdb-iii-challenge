
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        { name: 'James'},
        { name: 'Mike'},
        { name: 'Bob'},
        { name: 'Frank'},
        { name: 'Thomas'}
      ]);
    });
};
