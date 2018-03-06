const db = require('../db/knex');

const tbl = 'users';

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
};
