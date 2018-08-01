async function processOnePost(post, db) {
  const { userId, id, ...rest } = post;
  const tagIdObjs = await db('mapping_tags_post')
    .where('postId', id)
    .select();
  const tagIds = tagIdObjs.map(item => item.tagId);
  return new Promise((resolve, reject) => {
    const tagPromise = db('tags')
      .whereIn('id', tagIds)
      .select();
    const userPromise = db('users')
      .where('id', userId)
      .select();
    Promise.all([userPromise, tagPromise])
      .then((values) => {
        const [userNameObj, tags] = values;
        const { name: userName } = userNameObj[0];
        resolve({ ...rest, userId, userName, tags });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function processPost(req, res, next, db) {
  const { payload } = req.locals;
  if (payload !== undefined) {
    if (payload instanceof Array) {
      const processedPosts = await Promise.all(payload.map(post => processOnePost(post, db)));
      req.locals.payload = processedPosts;
    } else {
      const processedPost = await processOnePost(payload, db);
      req.locals.payload = processedPost;
    }
  }
  next();
}

module.exports = processPost;
