const knex = require('../database/db');

const postDb = {
	getAll: function() {
		return knex('posts');
	},
	addpost: function(post) {
		return knex.insert(post).into('posts')
	},
	addPostTag: function(postTag) {
		return knex.insert(postTag).into('post_tags')
	},
	getTagsByPostId: function(id) {
		return (
			knex('post_tags').where({ postId: id })
				.join('tags', 'post_tags.tagId', '=', 'tags.id')
				.select('tags.id', 'tag')
		);
	},
	getById: function(id) {
		return knex('posts').where({ id });
	},
	destroy: function(id) {
		return knex('posts').where({ id }).del();
	},
	update: function(id, post) {
		return knex('posts').where({ id }).update(post)
	}
}

module.exports = postDb;
