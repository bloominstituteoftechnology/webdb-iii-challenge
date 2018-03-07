const knex = require("../database/db.js");
const db = {
	getAll() {
		return knex("posts");
	},
	addPost(newPost) {
		return knex.insert(newPost).into("posts");
	},
	getById(id) {
		return knex("posts").where({ id });
	},
	updatePost(id, updatedPost) {
		return knex("posts")
			.where({ id })
			.update(updatedPost);
	},
	nuke(id) {
		return knex("posts")
			.join("posts_tags_links", "posts.id", "=", "posts_tags_links.post_id")
			.del();
	},
};

module.exports = db;
