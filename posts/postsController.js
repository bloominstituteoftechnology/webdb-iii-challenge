const db = require('../db/knex');
const error = require('../errors/errors');

const tbl = 'posts';

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
        .then(post => {
          if (!post) {
            error(res, 404, `Post with id: ${id} not found.`);
            return;
          }

          req.post = post;
          next();
        })
        .catch(err =>
          error(res, 500, `Error requesting id: ${id} from db.`, err),
        );
    },

    post: (req, res, next) => {
      const post = req.body;

      if (!post.text) {
        error(res, 422, 'Please provide text.');
        return;
      }

      next();
    },
  },

  create: (req, res) => {
    const post = req.body;

    db
      .add(tbl, post)
      .then(id => res.json({ id }))
      .catch(err => error(res, 500, 'Error saving post to db', err));
  },

  request: (req, res) => {
    db
      .get(tbl)
      .then(posts => res.json(posts))
      .catch(err => error(res, 500, 'Error connecting to db', err));
  },

  requestId: (req, res) => {
    res.json(req.post);
  },

  update: (req, res) => {
    const { id } = req.params;
    const post = req.body;

    db
      .update(tbl, id, post)
      .then(count => res.json({ message: 'Post updated successfully.', count }))
      .catch(err => error(res, 500, 'Error updating post', err));
  },

  del: (req, res) => {
    const { id } = req.params;

    db
      .del(tbl, id)
      .then(count => res.json({ message: 'Post deleted successfully.', count }))
      .catch(err => error(res, 500, 'Error deleting post', err));
  },
};
