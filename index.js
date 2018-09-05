const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const app = express();
const apiRoutes = require('./routes');

// middleware config
app.use(cors());
app.use(helmet());
app.use(logger('short'));
app.use(express.json());
app.use('/api', apiRoutes);

// error handling middleware
app.use(function(err, _, res, _) {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong, try again' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log('\n***', `Server listening on port ${PORT}`, '***\n'),
);
