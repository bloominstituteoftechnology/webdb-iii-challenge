const db = require('../configuration/db.js');

module.exports = {
  get: function(id) {
    let query = db('Tags');
    if (id) {
      query.where('id', id);
    }
    return query.then();
  },
};

/*

select p.text, u.name, t.tag from posts p
join users u on p.userId = u.id
join posttags pt on p.id = pt.postId
join tags t on pt.tagId = t.id

*/
