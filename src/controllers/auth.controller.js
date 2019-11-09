import database from '../database/models';
import { generateToken } from '../helpers/auth';
import { successResponse, serverError } from '../helpers/response';

const { User } = database;

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
    const newUser = await user.getSafeDataValues();
    const token = generateToken(newUser);

    return successResponse(
      res,
      201,
      'Your account has been created successfully',
      { user: newUser, token }
    );
  } catch (error) {
    return serverError(error);
  }
};

const googleOAuth = async(req, res, next) => {
  // console.log('req.user', req.user || req.user.dataValues);
  const token = generateToken(req.user.dataValues || req.user).split(' ')[1];
  res.status(200).json({token});
}

const secretRoute = async(req, res, next) => {
  // console.log(res)
  res.json({secret: 'Protected route'})
}

export { createUser, googleOAuth, secretRoute };
