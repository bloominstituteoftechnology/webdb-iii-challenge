const express = require('express');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const tagRoutes = require('./routes/tagRoutes');

const server = express();
const router = express.Router();

server.use(express());

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/tags', tagRoutes);

server.get('/', (req, res) => {
    res.send('up and running...');
});

const port = 8000;
server.listen(port, function() {
    console.log(`\n=== Web API Listening on htttp://localhost:${port} ===\n`);
});