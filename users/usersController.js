const db = require('../db/knex');
const error = require('../errors/errors');

const tbl = 'users';

const check = id => {
  return Number.isInteger(+id);
};

module.exports = {
  check: {
    id: (req, res, next) => {
      const { id } = req.params;

      if (!check(id)) {
        error(res, 422, `id: ${id} is not a number.`);
        return;
      }

      db
        .getById(tbl, id)
        .then(user => {
          if (!user) {
            error(res, 404, `User with id: ${id} not found.`);
            return;
          }

          req.user = user;
          next();
        })
        .catch(err =>
          error(res, 500, `Error requesting id: ${id} from db.`, err),
        );
    },

    user: (req, res, next) => {
      const user = req.body;

      if (!user.name) {
        error(res, 422, 'Please provide a username.');
        return;
      }

      next();
    },
  },

  create: (req, res) => {
    const user = req.body;

    db
      .add(tbl, user)
      .then(id => res.json({ id }))
      .catch(err => error(res, 500, 'Error saving user to db', err));
  },

  request: (req, res) => {
    db
      .get(tbl)
      .then(users => res.json(users))
      .catch(err => error(res, 500, 'Error connecting to db', err));
  },

  requestId: (req, res) => {
    res.json(req.user);
  },

  update: (req, res) => {
    const { id } = req.params;
    const user = req.body;

    db
      .update(tbl, id, user)
      .then(count => res.json({ message: 'User updated successfully.', count }))
      .catch(err => error(res, 500, 'Error updating user', err));
  },

  del: (req, res) => {
    const { id } = req.params;

    db
      .del(tbl, id)
      .then(count => res.json({ message: 'User deleted successfully.', count }))
      .catch(err => error(res, 500, 'Error deleting user', err));
  },
};
