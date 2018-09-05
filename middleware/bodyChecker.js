function bodyChecker(req,res,next){
  if(!req.body.name){
    res.status(500).json({Error: "The name property must be included"})
  } else {
    next()
  }
}

module.exports = bodyChecker; 