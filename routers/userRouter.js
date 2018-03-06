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

module.exports = userRouter;
