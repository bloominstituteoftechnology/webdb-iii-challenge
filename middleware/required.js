function userCheck(req, res, next) {
    const { name } = req.body;
    if (!name) next({ code: 400, errorMessage: "Please provide a name for the user." });
    if (name.length > 128) next({ code: 400, errorMessage: "Name provided is too long!" });
    next();
}

module.exports.userCheck = userCheck;
