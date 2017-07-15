const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        next(err);
      } else {
        req.user = decoded;
        next();
      }
    })
  } else if (req.method !== 'OPTIONS') {
    const err = new Error('No token provided');
    err.status = 403;
    next(err);
  } else {
    next();
  }
}