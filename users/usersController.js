const db = require('../db/knex');

const tbl = 'users';

const check = id => {
  return Number.isInteger(+id);
}

module.exports = {
  create: (req, res) => {
    const user = req.body;

    db
      .add(tbl, user)
      .then(id => res.json({ id }))
      .catch(err =>
        res.status(500).json({ message: 'Error saving user to db.', err }),
    );
  },

  check: (req, res, next) => {
    const user = req.body;

    if (!user.name) {
      res.status(422).json({ message: `Please provide a username.` })
      return;
    }

    next();
  },

  request: (req, res) => {

    db
      .get(tbl).then(users =>
        res.json(users))
      .catch(err => res.status(500).json({ message: `Error connecting to db.`, err }));
  },

  requestId: (req, res) => {
    const { id } = req.params;
    if (!check(id)) {
      res.status(422).json({ message: `id is not a number.` });
      return;
    }

    db.getById(tbl, id).then(user => {
      if (!user) {
        res.status(404).json({ message: `User with id: ${id} not found.` });
        return;
      }

      res.json(user);
    }).catch(err => {
      res.status(500).json({ message: `Error requesting id: ${id} from db.`, err })
    })
  }
};
