import { generateToken } from '../helpers/auth';
import { successResponse, serverError } from '../helpers/response';
import { User } from '../database/models';

/**
 * Creates a user successfully
 *
 * @param {obj} req The request object
 * @param {obj} res The response object
 * @returns {json} The response from db or error.
 */
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const newUser = user.getSafeDataValues();
    const token = generateToken(newUser);

    return successResponse(res, 201, 'user created', { user: newUser, token });
  } catch (error) {
    return serverError(res, 500, 'server error');
  }
};

export { createUser };
