const db = require('../db')

module.exports = {
  get: (id) => {
    let query = db('posts')
    if (id) {
      query.where('id', id).first()
    }
    return query
  },
  insert: post => {
    return db('posts')
      .insert(post).then(ids => ({ id: ids[0] }))
  },
  update: (id, post) => {
    return db('posts')
      .where('id', id)
      .update(post)
  },
  remove: id => {
    return db('posts')
      .where('id', id)
      .del()
  }
}
