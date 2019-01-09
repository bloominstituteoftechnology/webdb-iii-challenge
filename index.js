const express = require('express');
const server = express();
const PORT = process.env.PORT || 5000;
server.use(express.json());






server.listen(PORT, () => {
  console.log(`server is up and running on ${PORT}`)
})