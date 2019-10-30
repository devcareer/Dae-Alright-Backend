import response from '../helpers/response';
import { User } from '../database/models';

export default {
  checkExistingUser: async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      response.setError(409, 'user already exist');
      return response.send(res);
    }
    return next();
  },
};
