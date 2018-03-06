const express = require('express');

const userDb = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
	userDb.getAll()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch(err => {
			res.status(500).json({ error: `Could not retreive users ${err}` });
		});
});

userRouter.post('/', (req, res) => {
	const user = req.body;
	userDb.addUser(user)
		.then((userAdded) => {
			res.status(200).json(userAdded);
		})
		.catch(err => {
			res.status(500).json({ error: `Could not add user ${err}` });
		});
});

userRouter.get('/:id', (req, res) => {
	const { id } = req.params;
	userDb.getById(id)
		.then((user) => {
			if (user.length > 0) {
				res.status(200).json(user);
			} else {
				res.status(422).json({ error: 'User not found' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: `Could not retreive users ${err}` });
		});
});

userRouter.delete('/:id', (req, res) => {
	const { id } = req.params;
	userDb.destroy(id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({ success: true });
			} else {
				res.status(422).json({ error: 'User not found' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: `Could not remove user ${err}` });
		});
});

userRouter.put('/:id', (req, res) => {
	const { id } = req.params;
	const user = req.body;

	userDb.update(id, user)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({ success: true });
			} else {
				res.status(422).json({ error: 'User not found' });
			}
		})
		.catch(err => {
			res.status(500).json({ error: `Could not update user ${err}` });
		});
});

module.exports = userRouter;
