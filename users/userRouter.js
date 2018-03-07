const express = require('express');
const knex = require('../database/dbConfig');
const user_db = require('./userController.js');

const userRouter = express.Router()

userRouter.post('/', (req, res) => {
    const user = req.body;

    user_db.addUser(user)
        .then((ids) => {
            res.status(201).json(ids);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Could not add a User' })
        })

});

userRouter.get('/', (req, res) => {
    user_db.getAll()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Could not get Users' });
        });
});

userRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    user_db.getID()
        .then((user) => {
            user.length > 0 ? res.status(200).json(user) : res.status(404).json({ message: `User with id ${id} does not exist` });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error finding the user' });
        });
});

userRouter.get('/:id/posts', (req, res) => {
    const { id } = req.params;
    user_db.getPostByID(id)
        .then((posts) => {
            user.length > 0 ? res.status(200).json(posts) : res.status(404).json({ message: `Posts connected with this id ${id} do not exist` });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error finding the posts' });
        })
});

userRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    user_db.updateUser()
        .then((user) => {
            if (!user) {
                res.status(404).json({ messsage: `Unable to update user by this id ${id}` });
            } else {
                res.status(201).json(user);
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error updating User' });
        });
});

userRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    user_db.eraseUser()
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: `Unable to delete user by this id ${id}` });
            } else {
                res.status(200).json(user);
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error deleting User' });
        });
});

module.exports = userRouter;