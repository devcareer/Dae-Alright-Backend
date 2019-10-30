const jwt = require('jsonwebtoken');

const response = require('../helpers/response.js');

const { setError } = response;
const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    const { JWT_KEY } = process.env;
    jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) {
        setError(401, 'Token is not valid');
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } 
  setError(404, 'Auth token is not supplied');
};

module.exports = checkToken;

