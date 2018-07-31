function userCheck(req, res, next) {
    const { name } = req.body;
    if (!name) return next({ code: 400, errorMessage: "Please provide a name for the user." });
    if (name.length > 128) return next({ code: 400, errorMessage: "Name provided is too long!" });
    next();
}

function postCheck(req, res, next) {
    const { userId, text } = req.body;
    if (!userId || !text) return next({ code: 400, errorMessage: "Please provide userId and text for the post." });
    next();
}

function tagCheck(req, res, next) {
    const { tag } = req.body;
    if (!tag) return next({ code: 400, errorMessage: "Please provide a tag." });
    if (tag.length > 16) return next({ code: 400, errorMessage: "Tag provided is too long!" });
    tag = tag.toUpperCase();
    next();
}

module.exports.userCheck = userCheck;
module.exports.postCheck = postCheck;

