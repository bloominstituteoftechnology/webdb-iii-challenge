const express = require('express');

const port = 8000;
const server = express();



server.get('/', (req, res) => {

  res.send('Hello World <br><h1>RDBMS-API-Full : working on MVP</h1> <h3>Sam Khaled</h3>');
});



server.listen(port, () => console.log(`Server is running on port ${port}`));
