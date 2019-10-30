import { generateToken } from '../helpers/auth';
import response from '../helpers/response';
import { User } from '../database/models';

/**
 * @class AuthController
 */
export default class AuthController {
  /**
   * Creates a user successfully
   *
   * @param {obj} req The request object
   * @param {obj} res The response object
   * @returns {json} The response from db or error.
   */
  static async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      const newUser = user.getSafeDataValues();
      const token = `Bearer ${generateToken({ newUser })}`;

      response.setSuccess(201, 'user created', { user: newUser, token });
      return response.send(res);
      } catch (error) {
        response.setError(500, 'server error')
        return response.send(res);
    }
  }
}

export const signin = async (req, res) => {
  const { password, email } = req.body;
  const user = await getExistingUser(email, req.user.email);

  if (!user){
    return response.send(res, 400, 'Invalid email');
  }
  const comparePassword = await comparePassword(password, req.user.password);

  if (!comparePassword){
    return response.send(res, 400, 'Invalid password');
  }
  const { Id, } = req.user;
  const payload = { Id };
  req.user.token = await generateToken(payload);
  return respond.send(res, 200, 'Login successful');
};
