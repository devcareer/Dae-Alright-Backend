import jwt from 'jsonwebtoken';
import database from '../database/models';
import { errorResponse } from '../helpers/response';

const { Vendor } = database;

/**
 * Check if vendor already exists
 *
 * @param {obj} req The request object
 * @param {obj} res The response object
 * @param {obj} next The next function
 * @returns {Function} response
 */
export default {
  checkExistingVendor: async (req, res, next) => {
    const { email } = req.body;
    const vendor = await Vendor.findOne({ where: { email } });
    if (vendor) {
      return errorResponse(res, 409, 'vendor already exist');
    }
    return next();
  },

  checkToken: (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers.authorization;
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    if (token) {
      const { JWT_KEY } = process.env;
      jwt.verify(token, JWT_KEY, (err, vendor) => {
        if (err) {
          return errorResponse(
            res,
            400,
            'Invalid token, please provide a valid token'
          );
        }
        req.vendor = vendor;
        next();
      });
    }
    return errorResponse(res, 404, 'Auth token is not supplied');
  },
};
