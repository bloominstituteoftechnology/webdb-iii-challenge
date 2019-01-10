const   express = require('express'),
        Middleware = require('./MIddleware/Middleware'),
        port = 3333,
        server = express();

     



// import middleware  and call 
Middleware(server);




server.listen(port, function() {
  console.log(`\n *** MY RDBS-API-FULL  Listening on http://localhost:${port} ***\n`);
});
