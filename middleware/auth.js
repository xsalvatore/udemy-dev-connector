// modules importation
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // gets the token from the header
  const token = req.header('x-auth-token');

  // if there is no token, returns a 401 status with a custom error messages
  if (!token) {
    return res.status(401).json({ msg: 'no token, authorization denied' });
  }

  // verifies the token
  try {
    // decodes the jsonwebtoken
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // sets the user from the request to the decoded users id from the jsonwebtoken
    req.user = decoded.user;

    // calls the next middleware
    next();
  } catch (err) {
    // sends a 401 status with a custom error messages
    res.status(401).json({ msg: 'token is not valid' });
  }
};
