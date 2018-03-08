const db = require('../db/knex');
const validate = require('../validation/validation');
const error = require('../errors/errors');

const tbl = 'blogposts';

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
        .then(blogpost => {
          if (!blogpost) {
            error(res, 404, `Blogpost with id: ${id} not found.`);
            return;
          }

          req.blogpost = blogpost;
          next();
        })
        .catch(err =>
          error(res, 500, `Error requesting id: ${id} from db.`, err),
        );
    },

    blogpost: (req, res, next) => {
      const { postId } = req.body;

      if (!postId) {
        error(res, 422, 'Please a postId.');
        return;
      }

      next();
    },

    refIds: (req, res, next) => {
      const { postId } = req.body;

      db
        .getOneBy('posts', { id: postId })
        .then(post => {
          if (!post) {
            error(res, 404, `Post with id: ${postId} not found.`);
            return;
          }

          next();
        })
        .catch(err =>
          error(res, 500, `Error requesting postId: ${postId} from db.`, err),
        );
    },
  },

  create: (req, res) => {
    const blogpost = req.body;

    db
      .add(tbl, blogpost)
      .then(id => res.status(201).json({ id }))
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
