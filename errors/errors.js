module.exports = (res, code, message, err) => {
  res.status(code).json({ message, err });
};
