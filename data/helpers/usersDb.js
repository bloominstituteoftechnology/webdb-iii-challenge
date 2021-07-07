const db = require('../dbConfig.js');

module.exports = {
    get: function(id) {
        let query = db('users');
        if (id) {
          query.where('id', Number(id)).first();
        }
    
        return query;
      }
};