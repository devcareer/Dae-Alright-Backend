import database from '../database/models';
import { generateToken } from '../helpers/auth';
import { successResponse, serverError, errorResponse } from '../helpers/response';

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

const socialOAuth = async(req, res, next) => {
  try {
    // console.log('req.user', req.user || req.user.dataValues);
    const user = req.user || req.user.dataValues;
    const token = generateToken(req.user.dataValues || req.user);
    const statusCode = req.user.dataValues ? 200 : 201;
    return successResponse(res, statusCode, 'Signed in', {token, user})
  }catch(err){
    return errorResponse(res, 400, err.message);
  }
  
}

const secretRoute = async(req, res, next) => {
  res.json({secret: 'Protected route'})
}

export { createUser, socialOAuth, secretRoute };
