async function processOnePost(post, db) {
  const { userId, id, ...rest } = post;

  // obtain all tagIds associated with post in an array
  // const tagIdObjs = await db('mapping_tags_post')
  //   .where('postId', id)
  //   .select();
  // const tagIds = tagIdObjs.map(item => item.tagId);

  // return Promise that will return the processedObject
  return new Promise((resolve, reject) => {
    // first promise is a query for all tags
    const tagIdSubQuery = db('mapping_tags_post')
      .where('postId', id)
      .select('tagId');
    const tagPromise = db('tags')
      .where('id', 'in', tagIdSubQuery)
      .select();

    // second promise is a query for user
    const userPromise = db('users')
      .where('id', userId)
      .select();

    // Promise.all waits for prior two promises to complete, then forms new object,
    // and resolves
    Promise.all([userPromise, tagPromise])
      .then((values) => {
        const [userNameObj, tags] = values;
        const { name: userName } = userNameObj[0];
        resolve({
          ...rest,
          userId,
          userName,
          tags,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function processPost(req, res, next, db) {
  // collect previously returned payload on req.locals namespace
  const { payload, type } = req.locals;

  // only handles if payload is defined
  if (payload !== undefined && type === 'posts') {
    // if payload is an array, handles all posts in the array using Promise.all, then return processed array
    if (payload instanceof Array) {
      const processedPosts = await Promise.all(payload.map(post => processOnePost(post, db)));
      req.locals.payload = processedPosts;
    } else {
      // handles payload if a single post
      const processedPost = await processOnePost(payload, db);
      req.locals.payload = processedPost;
    }
  }
  next();
}

module.exports = processPost;
