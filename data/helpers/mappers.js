module.exports = {
  intToBoolean,
  booleanToint,
  userToBody,
  postToBody,
  tagToBody
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToint(bool) {
  return bool === true ? 1 : 0;
}

function userToBody(user) {
  const result = {
    ...user,
    // completed: intToBoolean(user.completed),
  };

  // if (project.actions) {
  //   result.actions = project.actions.map(action => ({
  //     ...action,
  //     completed: intToBoolean(action.completed),
  //   }));
  // }

  return result;
}

function postToBody(post) {
  return {
    ...post,
    // completed: intToBoolean(post.completed),
  };
}

function tagToBody(tag) {
  return {
    ...tag,
    // completed: intToBoolean(tag.completed),
  };
}
