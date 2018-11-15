const server = require('./api/server');

const port = 8000;
server.listen(port, () => console.log(`Server is running on ${port}`))