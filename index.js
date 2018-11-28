const express = require('express');
const server = express();
server.get('/', (req, res) => {
    res.send('hellooooss');
});
server.listen(5000, () => console.log('Server running on port 5000'));


// Angelo Deleon FSW14