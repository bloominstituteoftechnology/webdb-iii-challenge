// middleware for project constraints
function usersConstraints(req, res, next) {
  const NAME = req.body.name;

  if (!NAME) {
    return next({
      code: 400,
      error: `Please provide a 'name' for the new user.`,
    });
  }

  if (NAME.length > 128) {
    return next({
      code: 400,
      error: `The 'name' of the user must be fewer than 128 characters.`,
    });
  }
  next();
}

// middleware for action constraints
function tagsConstraints(req, res, next) {
  const TAG = req.body.tag;

  if (!TAG) {
    return next({
      code: 400,
      error: `Please provide a 'tag' for the new tag.`,
    });
  }

  if (DESCRIPTION.length > 16) {
    return next({
      code: 400,
      error: `The 'tag' must be fewer than 16 characters.`,
    });
  }
  next();
}

module.exports.usersConstraints = usersConstraints;
module.exports.tagsConstraints = tagsConstraints;
