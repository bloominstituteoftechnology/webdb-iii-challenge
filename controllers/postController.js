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
		let query = knex('posts as p')
		query
			.join('users as u', 'p.userId', 'u.id')
			.select('u.name as postedBy', 'p.text')
			.where('p.id', id);

		const promises = [query, this.getTagsByPostId(id)];
		return Promise.all(promises).then(function(results) {
			let [posts, tags] = results;
			let post = posts[0];
			post.tags = tags.map(t => t.tag);

			return post;
		})
	},
	destroy: function(id) {
		return knex('posts').where({ id }).del();
	},
	update: function(id, post) {
		return knex('posts').where({ id }).update(post)
	}
}

module.exports = postDb;
