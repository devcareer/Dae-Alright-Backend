import jwt from 'jsonwebtoken';
import database from '../database/models';
import { errorResponse } from '../helpers/response';

const { User, Vendor } = database;

/**
 * Check if user already exists
 *
 * @param {obj} req The request object
 * @param {obj} res The response object
 * @param {obj} next The next function
 * @returns {Function} response
 */
export default {
  checkExistingClient: async (req, res, next) => {
    const role = req.url.split('/')[1];
    const { email } = req.body;
    const client = role === 'user' ? await User.findOne({ where: { email } }) : await Vendor.findOne({ where: { email } });
    if (client) {
      return errorResponse(res, 409, `${role} already exist`);
    }
    return next();
  },

  checkToken: (req, res, next) => {
    const role = req.url.split('/')[1];
    let token = req.headers['x-access-token'] || req.headers.authorization;
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    if (token) {
      const { JWT_KEY } = process.env;
      jwt.verify(token, JWT_KEY, (err, client) => {
        if (err) {
          return errorResponse(
            res,
            400,
            'Invalid token, please provide a valid token'
          );
        }
        req[role] = client;
        next();
      });
    }
    return errorResponse(res, 404, 'Auth token is not supplied');
  },
};
