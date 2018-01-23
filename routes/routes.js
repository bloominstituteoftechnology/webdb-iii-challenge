const UsersRoutes = require('./users.routes.js');
const PostsRoutes = require('./posts.routes.js');
const TagsRoutes = require('./tags.routes.js');

const knex = require('../database/db.js');

module.exports = (server) => {

  UsersRoutes(server);
  PostsRoutes(server);
  TagsRoutes(server);


  /* Extra Credit - Routes */
  server.get('/posts/:id/tags', (req, res) => {

    const { id } = req.params;

    knex('Posts_Tags').where({ postId: id })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });

  server.get('/posts/:id', (req, res) => {

    const { id } = req.params;

    knex('Users').where({ name: id }).select('id')
      .then((response) => {
        const userId = response[0].id;
        
        knex('Posts').where({ userId })
          .then((resp) => {
            res.status(200).json(resp);
          })
          .catch((err) => {
            res.status(422).json({ error: err });
          });

      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });
  
};
