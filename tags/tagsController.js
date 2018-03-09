const db = require('../db/knex');
const validate = require('../validation/validation');
const error = require('../errors/errors');

const tbl = 'tags';

module.exports = {
  check: {
    id: (req, res, next) => {
      const { id } = req.params;

      if (!validate.isNumber(id)) {
        error(res, 422, `id: ${id} is not a number.`);
        return;
      }

      db
        .getOneBy(tbl, { id })
        .then(tag => {
          if (!tag) {
            error(res, 404, `Tag with id: ${id} not found.`);
            return;
          }

          req.tag = tag;
          next();
        })
        .catch(err =>
          error(res, 500, `Error requesting id: ${id} from db.`, err),
        );
    },

    tag: (req, res, next) => {
      const tag = req.body;

      if (!tag.tag) {
        error(res, 422, 'Please provide tag.');
        return;
      }

      next();
    },
  },

  create: (req, res) => {
    const tag = req.body;

    db
      .add(tbl, tag)
      .then(id => res.status(201).json({ id }))
      .catch(err => error(res, 500, 'Error saving tag to db', err));
  },

  request: (req, res) => {
    db
      .get(tbl)
      .then(tags => res.json(tags))
      .catch(err => error(res, 500, 'Error connecting to db', err));
  },

  requestId: (req, res) => {
    res.json(req.tag);
  },

  update: (req, res) => {
    const { id } = req.params;
    const tag = req.body;

    db
      .update(tbl, id, tag)
      .then(count => res.json({ message: 'Tag updated successfully.', count }))
      .catch(err => error(res, 500, 'Error updating tag', err));
  },

  del: (req, res) => {
    const { id } = req.params;

    db
      .del(tbl, id)
      .then(count => res.json({ message: 'Tag deleted successfully.', count }))
      .catch(err => error(res, 500, 'Error deleting tag', err));
  },
};
