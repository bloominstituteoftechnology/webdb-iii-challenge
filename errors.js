class HttpError extends Error {
  constructor({ message, code }) {
    super(message);
    this.code = code;
  }
}

module.exports = {
  HttpError,
  noResult: {
    message: 'Database did not return any result.',
    code: 404,
  },
  noEffect: {
    message: 'Database responded but was unable to complete requested action.',
    code: 500,
  },

};
