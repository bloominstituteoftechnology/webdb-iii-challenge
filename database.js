

//== Knex Database Configuration ===============================================

//-- Dependencies --------------------------------
const knex       = require('knex'         );
const knexConfig = require('./knexfile.js');

//-- Configure & Export --------------------------
module.exports = knex(knexConfig.development);
