const server = require('./server');

server.get('/', (req, res, next) => {
  res.send(`
    <h1>Welcome to RDBMS API Full!</h1>
  `);
});

server.listen(5000, () => console.log('\n** Running on port 5000 **\n'));