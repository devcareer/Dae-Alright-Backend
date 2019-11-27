import jwt from 'jsonwebtoken';
import database from '../database/models';
import { generateToken } from '../helpers/auth';
import { errorResponse, successResponse, serverError } from '../helpers/response';

const { Vendor, User } = database;

/**
 * Creates a client successfully
 *
 * @param {obj} req The request object
 * @param {obj} res The response object
 * @returns {json} The response from db or error.
 */
export const createClient = async (req, res) => {
  const role = req.url.split('/')[1];
  try {
    const client = role === 'vendor' ? await Vendor.create(req.body) : await User.create(req.body);
    const newClient = await client.getSafeDataValues();
    const token = generateToken(newClient);

    return successResponse(
      res,
      201,
      'Your account has been created successfully',
      { [role]: newClient, token }
    );
  } catch (error) {
    return serverError(res);
  }
};

export let account;
export const findRole = (req, res, next) => {
  account = req.url.split('/')[1];
  next();
};

export const socialOAuth = async (req, res) => {
  try {
    const user = req.user.dataValues ? req.user.dataValues : req.user;
    const { socialID, email } = user;
    const token = `Bearer ${jwt.sign({ socialID, email }, process.env.JWT_KEY, { expiresIn: '24h' })}`;
    const statusCode = req.user.dataValues ? 200 : 201;
    const message = req.user.dataValues ? 'Logged in' : 'Account Created';
    return successResponse(res, statusCode, message, { token, user });
  } catch (err) {
    return errorResponse(res, 400, err.message);
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
 * Login a vendor successfully
 *
 * @param {obj} req The request object
 * @param {obj} res The response object
 * @returns {json} The response from db or error.
 */
export const signin = async (req, res) => {
  const role = req.url.split('/')[1];
  const { password, email } = req.body;

  const getClient = role === 'vendor' ? await Vendor.findOne({ where: { email } }) : await User.findOne({ where: { email } });
  if (!getClient) {
    return errorResponse(res, 400, 'Email/Password incorrect');
  }

  const comparePassword = await getClient.validatePassword(password);
  if (!comparePassword) {
    return errorResponse(res, 400, 'Email/Password incorrect');
  }

  const token = generateToken({ email });
  const client = await getClient.getSafeDataValues();

  return successResponse(res, 200, 'Login successful', { [role]: client, token });
};
