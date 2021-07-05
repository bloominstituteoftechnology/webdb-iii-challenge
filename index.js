const express = require('express');
const apiRoutes = require('./api/apiRoutes');

const server = express();

server.use('/api', apiRoutes);
server.use((err, req, res, next) => {
  switch (err.code) {
    case 400:
      res
        .status(400)
        .json({ error: `Please provide all required information within any applicable character length constraints.` })
        .end()
    case 404:
      res
        .status(404)
        .json({ error: `The specified ID does not exist.` })
        .end()
    default:
      res
        .status(500)
        .json({ error: `The operation could not be performed.` })
        .end()
  }
});


server.listen(8000, () => console.log(`API running on port 8000`));