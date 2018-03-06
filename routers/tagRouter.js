const express = require('express');

const tagDb = require('../controllers/tagController');

const tagRouter = express.Router();

tagRouter.get('/', (req, res) => {
	tagDb.getAll()
		.then((tags) => {
			res.status(200).json(tags);
		})
		.catch(err => {
			res.status(500).json({ error: `Could not retreive tags ${err}` });
		});
});

tagRouter.post('/', (req, res) => {
	const tag = req.body;
	tagDb.addtag(tag)
		.then((tagAdded) => {
			res.status(200).json(tagAdded);
		})
		.catch(err => {
			res.status(500).json({ error: `Could not add tag ${err}` });
		});
});

tagRouter.get('/:id', (req, res) => {
	const { id } = req.params;
	tagDb.getById(id)
		.then((tag) => {
			if (tag.length > 0) {
				res.status(200).json(tag);
			} else {
				res.status(422).json({ error: 'tag not found' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: `Could not retreive tags ${err}` });
		});
});

tagRouter.delete('/:id', (req, res) => {
	const { id } = req.params;
	tagDb.destroy(id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({ success: true });
			} else {
				res.status(422).json({ error: 'tag not found' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: `Could not remove tag ${err}` });
		});
});

tagRouter.put('/:id', (req, res) => {
	const { id } = req.params;
	const tag = req.body;

	tagDb.update(id, tag)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({ success: true });
			} else {
				res.status(422).json({ error: 'tag not found' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: `Could not update tag ${err}` });
		});
});

module.exports = tagRouter;
