const express = require('express');

const postDb = require('../controllers/postController');

const postRouter = express.Router();

postRouter.get('/', (req, res) => {
	postDb.getAll()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch(err => {
			res.status(500).json({ error: `Could not retreive posts ${err}` });
		});
});

postRouter.post('/', (req, res) => {
	const post = req.body;
	postDb.addpost(post)
		.then((postAdded) => {
			res.status(200).json(postAdded);
		})
		.catch(err => {
			res.status(500).json({ error: `Could not add post ${err}` });
		});
});

postRouter.get('/:id', (req, res) => {
	const { id } = req.params;
	postDb.getById(id)
		.then((post) => {
			if (post.length > 0) {
				res.status(200).json(post);
			} else {
				res.status(422).json({ error: 'post not found' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: `Could not retreive posts ${err}` });
		});
});

postRouter.delete('/:id', (req, res) => {
	const { id } = req.params;
	postDb.destroy(id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({ success: true });
			} else {
				res.status(422).json({ error: 'post not found' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: `Could not remove post ${err}` });
		});
});

postRouter.put('/:id', (req, res) => {
	const { id } = req.params;
	const post = req.body;

	postDb.update(id, post)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({ success: true });
			} else {
				res.status(422).json({ error: 'post not found' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: `Could not update post ${err}` });
		});
});

postRouter.post('/:id/tags', (req, res) => {
	const postId = req.params.id;
	const tagId = req.body.id;
	const postTag = {
		postId: postId,
		tagId: tagId
	}
	postDb.addPostTag(postTag)
		.then((ids) => {
			res.status(200).json({ success: true })
		})
		.catch((err) => {
			res.status(500).json({ error: `Could not add post_tag ${err}` });
		});
});

postRouter.get('/:id/tags', (req, res) => {
	const { id } = req.params;
	postDb.getTagsByPostId(id)
		.then((tags) => {
			res.status(200).json(tags);
		})
		.catch((err) => {
			res.status(500).json({ error: `Could not retreive tags ${err}` });
		});
});

module.exports = postRouter;





