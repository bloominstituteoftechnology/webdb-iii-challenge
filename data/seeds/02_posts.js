
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('Posts').insert([
        {
          id: 1,
          userId: 1,
          text: 'I wish the ring had never come to me. I wish none of this had happened.',
        },
        {
          id: 2,
          userId: 2,
          text: 'I think we should get off the road. Get off the road! Quick!',
        },
        {
          id: 3,
          userId: 3,
          text: "I made a promise, Mr Frodo. A promise. \"Don't you leave him Samwise Gamgee.\" And I don't mean to. I don't mean to.",
        },
        {
          id: 4,
          userId: 1,
          text: " N-nothing important. That is, I heard a great deal about a ring, a Dark Lord, and something about the end of the world, but... Please, Mr. Gandalf, sir, don't hurt me. Don't turn me into anything... unnatural.",
        },
        {
          id: 5,
          userId: 3,
          text: 'All you have to do is decide what to do with the time that is given to you.',
        },
        {
          id: 6,
          userId: 1,
          text: 'Do not be so quick to deal out death and judgement. Even the very wise do not see all ends.',
        },
        {
          id: 7,
          userId: 2,
          text: ' Fool of a Took! Throw yourself in next time and rid us of your stupidity!',
        },
        {
          id: 8,
          userId: 3,
          text: 'I will be dead before I see the ring in the hands of an elf! Never trust an elf!',
        },
        {
          id: 9,
          userId: 2,
          text: 'You need people of intelligence on this sort of mission...quest...thing.',
        },
      ]);
    });
};
