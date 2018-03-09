exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert([
        { id: 1, userId: 1, text: 'My name is Haywood.' },
        { id: 2, userId: 2, text: 'My name is Sam.' },
        { id: 3, userId: 3, text: 'My name is Luis.' },
        { id: 4, userId: 1, text: 'My last name is Johnson.' },
        { id: 5, userId: 1, text: "I'm a super hero." },
        { id: 6, userId: 4, text: 'I love Macs.' },
        { id: 7, userId: 2, text: 'My last name is Cha.' },
      ]);
    });
};
