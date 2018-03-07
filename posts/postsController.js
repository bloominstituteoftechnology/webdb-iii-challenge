const db = require('../db/knex');
const validate = require('../validation/validation');
const error = require('../errors/errors');

const tbl = 'posts';

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

  requestTags: (req, res) => {
    const { id } = req.params;

    /*    tbl = 'posts'    */
    const col = 'posts.id';
    const col_2 = 'posts.userId';

    const refTbl = 'blogposts';
    const refCol1 = 'blogposts.postId';
    const refCol2 = 'blogposts.tag';

    const tbl2 = 'tags';
    const col2 = 'tags.tag';

    const tbl3 = 'users';
    const col3 = 'users.id';

    const cond = { 'blogposts.postId': id };

    const sel = 'blogposts.tag';

    const ref = { tbl: refTbl, col1: refCol1, col2: refCol2, col3: col_2 };
    const tbl_1 = { id: tbl, col: col };
    const tbl_2 = { id: tbl2, col: col2 };
    const tbl_3 = { id: tbl3, col: col3 };

    db
      .join3_where_select(ref, tbl_1, tbl_2, tbl_3, cond, sel)
      .then(
        posts =>
          posts.length === 0
            ? res.json([null])
            : res.json(posts.map(e => e.tag)),
      )
      .catch(err =>
        error(res, 500, `Error retrieving post (id: ${id}) tags.`, err),
      );
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
