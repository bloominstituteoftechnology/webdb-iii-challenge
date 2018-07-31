const db = require('../db')

module.exports = {
  get: (id) => {
    let query = db('users')
    if (id) {
      query.where('id', Number(id)).first()
    }
    return query
  },
  getUserPosts: (userId) => {
    return db('posts').where('userId', userId)
  },
  insert: (user) => {
    return db('users')
      .insert(user)
      .then(ids => ({ id: ids[0] }))
  },
  update: (id, user) => {
    return db('users')
      .where('id', id)
      .update(user)
  },
  remove: id => {
    return db('users')
      .where('id', id)
      .del()
  }
}
