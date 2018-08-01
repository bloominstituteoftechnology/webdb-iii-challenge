module.exports = {
  userToBody,
  postToBody,
  tagToBody
};

function userToBody(user) {
  const result = { ...user };

  if (user.posts) {
    result.posts = user.posts.map(post => ({
      ...post
    }));
  }

  return result;
}

function postToBody(post) {
  const result = { ...post };

  if (post.tags) {
    result.tags = post.tags.map(tag => ({
      ...tag
    }));
  }

  return result;
}

function tagToBody(tag) {
  return { ...tag };
}
