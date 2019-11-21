import database from '../database/models';
import { generateToken } from '../helpers/auth';
import { errorResponse, successResponse, serverError } from '../helpers/response';

const { User } = database;

/**
 * Creates a user successfully
 *
 * @param {obj} req The request object
 * @param {obj} res The response object
 * @returns {json} The response from db or error.
 */
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const newUser = await user.getSafeDataValues();
    const token = generateToken(newUser);

    return successResponse(res, 201, 'Your account has been created successfully', {
      user: newUser,
      token,
    });
  } catch (error) {
    return serverError(error);
  }
};

export const socialOAuth = async (req, res) => {
  try {
    const user = req.user || req.user.dataValues;
    const token = generateToken(req.user.dataValues || req.user);
    const statusCode = req.user.dataValues ? 200 : 201;
    const message = req.user.dataValues ? 'Signed in' : 'Registered';
    return successResponse(res, statusCode, message, { token, user });
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
};

/**
 * Login a user successfully
 *
 * @param {obj} req The request object
 * @param {obj} res The response object
 * @returns {json} The response from db or error.
 */
export const signin = async (req, res) => {
  const { password, email } = req.body;

  const getUser = await User.findOne({ where: { email } });
  if (!getUser) {
    return errorResponse(res, 400, 'Email/Password incorrect');
  }

  const comparePassword = await getUser.validatePassword(password);
  if (!comparePassword) {
    return errorResponse(res, 400, 'Email/Password incorrect');
  }

  const token = generateToken({ email });
  const user = await getUser.getSafeDataValues();

  return successResponse(res, 200, 'Login successful', { user, token });
};
