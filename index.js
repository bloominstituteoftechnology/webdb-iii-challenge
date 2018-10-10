/// ---- Node Dependencies ----
const express = require('express');
const helmet = require('helmet');

/// ---- Initialize Server ----
const server = express();

/// ---- Connect Middleware to Server ----
server.use(helmet(), express.json());

///// ---------- CRUD ENDPOINTS ----------

/// ----- Root Server GET Endpoint -----
server.get('/', (request, response) => {
    response.send("Dance magic, dance.")
})

const port = 9999;
server.listen(port, () => {console.log(`#### Server active on port ${port} ####\n`)})