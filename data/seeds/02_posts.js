
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {userId: '1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
            {id: 1, userId: 3, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam id leo in vitae turpis massa sed elementum tempus. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Placerat in egestas erat imperdiet sed euismod nisi porta lorem. Pharetra pharetra massa massa ultricies. Consequat nisl vel pretium lectus. Tincidunt arcu non sodales neque sodales ut etiam. Non blandit massa enim nec. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Hendrerit gravida rutrum quisque non tellus orci ac auctor. Pharetra sit amet aliquam id diam. Amet risus nullam eget felis eget nunc lobortis.'},
            {id: 2, userId: 4, text: 'Pharetra pharetra massa massa ultricies. Consequat nisl vel pretium lectus. Tincidunt arcu non sodales neque sodales ut etiam. Non blandit massa enim nec. Non pulvinar neque laoreet suspendisse interdum consectetur libero. Hendrerit gravida rutrum quisque non tellus orci ac auctor. Pharetra sit amet aliquam id diam. Amet risus nullam eget felis eget nunc lobortis.'},
            {id: 3, userId: 2, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet tellus cras adipiscing. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. In est ante in nibh mauris cursus. Ultrices dui sapien eget mi proin sed libero. Varius morbi enim nunc faucibus a pellentesque sit amet.'},
            {id: 4, userId: 4, text: 'Ultricies integer quis auctor elit sed. Nunc non blandit massa enim nec. Egestas diam in arcu cursus. Vitae aliquet nec ullamcorper sit amet. Porttitor rhoncus dolor purus non enim praesent. Aenean sed adipiscing diam donec adipiscing. Feugiat pretium nibh ipsum consequat nisl vel. '},
            {id: 5, userId: 2, text: 'Fusce id velit ut tortor pretium viverra suspendisse. Eget egestas purus viverra accumsan in nisl nisi. Ut tortor pretium viverra suspendisse potenti nullam ac. Id eu nisl nunc mi ipsum faucibus. Leo urna molestie at elementum eu facilisis.'},
            {id: 6, userId: 3, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
      ]);
    });
};
