function userCheck(req, res, next) {
    const { name } = req.body;
    if (!name) return next({ code: 400, errorMessage: "Please provide a name for the user." });
    if (name.length > 128) return next({ code: 400, errorMessage: "Name provided is too long!" });
    next();
}

function postCheck(req, res, next) {
    const { userId, text } = req.body;
    if (!userId || !text) next({ code: 400, errorMessage: "Please provide userId and text for the post." });
    next();
}

module.exports.userCheck = userCheck;
module.exports.postCheck = postCheck;

