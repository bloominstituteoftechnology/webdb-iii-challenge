const knex = require('../database/db.js');

module.exports = (server) => {
  
  server.post('/tags', (req, res) => {
    
    const { tag } = req.body;

    knex.insert({ tag }).into('Tags')
      .then((response) => {
        res.status(201).json({ success: true });
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });

  server.get('/tags', (req, res) => {

    knex('Tags')
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });

  server.get('/tags/:id', (req, res) => {

    const { id } = req.params;

    knex('Tags').where({ id })
      .then((response) => {
        res.status(200).json(response[0]);
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });

  server.put('/tags/:id', (req, res) => {

    const { id } = req.params;
    const tag = req.body;

    knex('Tags').where({ id }).update(tag)
      .then((response) => {
        res.status(200).json({ success: true });
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });

  server.delete('/tags/:id', (req, res) => {

    const { id } = req.params;

    knex('Tags').where({ id }).del()
      .then((response) => {
        res.status(200).json({ success: true });
      })
      .catch((error) => {
        res.status(422).json({ error });
      });

  });
  
};