exports.up = function(knex) {
  return createUsersTable(knex)
    .then(createPostsTable)
    .then(createTagsTable)
    .then(createPostTagsTable)
    .catch(error => {
      console.log(error);
      reject(error);
    });
};

exports.down = function(knex) {
  	return knex.schema
	    .dropTableIfExists('posttags')
	    .then(function() {
	      console.log('dropping tags');
	      return knex.schema.dropTableIfExists('tags');
	    })
	    .then(function() {
	      console.log('dropping posts');
	      return knex.schema.dropTableIfExists('posts');
	    })
	    .then(function() {
	      console.log('dropping users');
	      return knex.schema.dropTableIfExists('users');
	    })
	    .catch(error => console.log(error));
};
