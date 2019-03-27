const server = require("./server.js");

const port = 5000;

server.listen(port, function() {
  console.log(`*** Server listening on port ${port}. ***`);
});
