const db = require('../configuration/db.js');

module.exports = {
  get: function(id) {
    let query = db('Posts as p');

    if (id) {
      query
        .join('Users as u', 'p.userId', 'u.id')
        .select('p.text', 'u.name')
        .where('p.id', id);

      const promises = [query, this.getPostTags(id)]; // [ posts, tags ]

      return Promise.all(promises).then(function(results) {
        let [Posts, Tags] = results;
        let post = Posts[0];
        post.Tags = Tags.map(t => t.tag);

        return post;
      });
    }

    return query.then();
  },
  getPostTags: function(postId) {
    return db('Tags as t')
      .join('PostTags as pt', 't.id', 'pt.tagId')
      .select('t.tag')
      .where('pt.postId', postId)
      .then();
  },
};

/*

select p.text, u.name, t.tag from posts p
join users u on p.userId = u.id
join posttags pt on p.id = pt.postId
join tags t on pt.tagId = t.id

*/
