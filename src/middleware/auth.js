import { errorResponse } from '../helpers/response';
import { User } from '../database/models';

export default {
  checkExistingUser: async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      return errorResponse(res, 409, 'user already exist');
    }
    return next();
  },

  checkToken: (req, res, next) => {
    // Express headers are auto converted to lowercase
    let token = req.headers['x-access-token'] || req.headers.authorization;
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    if (token) {
      const { JWT_KEY } = process.env;
      jwt.verify(token, JWT_KEY, (err, user) => {
        if (err) {
          return errorResponse(res, 400, 'Invalid token, please provide a valid token');
        }
        req.user = user;
          next();
      });
    }
    errorResponse(res, 404, 'Auth token is not supplied');
  }
};
