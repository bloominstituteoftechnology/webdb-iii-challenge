module.exports = {
  userToBody,
  postToBody,
  tagToBody
};

function userToBody(user) {
  const result = {...user};

  if (user.posts) {
    result.posts = user.posts.map(post => ({
      ...post
    }));
  }

  return result;
}

function postToBody(post) {
  return {...post};
}

function tagToBody(tag) {
  return {...tag};
}
