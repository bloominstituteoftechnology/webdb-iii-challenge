module.exports = (req, res, next) => {
  req.body.name && typeof req.body.name === 'string' && req.body.name.length < 256
  ? next()
  : res.json({ error: "please provide a 'name' that is a string (i.e., in quotes) and under 256 characters" })
}