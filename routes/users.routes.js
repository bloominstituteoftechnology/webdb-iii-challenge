const knex = require('../database/db.js');

module.exports = (server) => {

  server.post('/users', (req, res) => {

    const { name } = req.body;

    knex.insert({ name }).into('Users')
      .then((response) => {
        res.status(201).json({ success: true });
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });

  server.get('/users', (req, res) => {

    knex('Users')
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });

  server.get('/users/:id', (req, res) => {

    const { id } = req.params;

    knex('Users').where({ id })
      .then((response) => {
        res.status(200).json(response[0]);
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });

  server.get('/users/:id/posts', (req, res) => {

    const { id } = req.params;

    knex('Posts').where({ userId: id })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(422).json({ error });
      });
 
  });

  server.put('/users/:id', (req, res) => {

    const { id } = req.params;
    const user = req.body;

    knex('Users').where({ id }).update(user)
      .then((response) => {
        res.status(200).json({ success: true });
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });

  server.delete('/users/:id', (req, res) => {

    const { id } = req.params;

    knex('Users').where({ id }).del()
      .then((response) => {
        res.status(200).json({ success: true });
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });

};