const knex = require('../database/db.js');

module.exports = (server) => {

  server.post('/posts', (req, res) => {
    
    const post = req.body;

    knex.insert(post).into('Posts')
      .then((response) => {
        res.status(201).json({ success: true });
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });

  server.get('/posts', (req, res) => {

    knex('Posts')
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });

  server.get('/posts/:id', (req, res) => {

    const { id } = req.params;

    knex('Posts').where({ id })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });

  server.put('/posts/:id', (req, res) => {

    const { id } = req.params;
    const post = req.body;

    knex('Posts').where({ id }).update(post)
      .then((response) => {
        res.status(200).json({ success: true });
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });

  server.delete('/posts/:id', (req, res) => {

    const { id } = req.params;

    knex('Posts').where({ id }).del()
      .then((response) => {
        res.status(200).json({ success: true });
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });

};