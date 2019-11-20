import database from '../database/models';
import { generateToken } from '../helpers/auth';
import { errorResponse, successResponse, serverError } from '../helpers/response';

const { Vendor } = database;

/**
 * Creates a vendor successfully
 *
 * @param {obj} req The request object
 * @param {obj} res The response object
 * @returns {json} The response from db or error.
 */
export const createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    const newVendor = await vendor.getSafeDataValues();
    const token = generateToken(newVendor);

    return successResponse(
      res,
      201,
      'Your account has been created successfully',
      { vendor: newVendor, token }
    );
  } catch (error) {
    return serverError(error);
  }
};

/**
 * Login a vendor successfully
 *
 * @param {obj} req The request object
 * @param {obj} res The response object
 * @returns {json} The response from db or error.
 */
export const vendorSignin = async (req, res) => {
  const { password, email } = req.body;

  const getVendor = await Vendor.findOne({ where: { email } });
  if (!getVendor) {
    return errorResponse(res, 400, 'Email/Password incorrect');
  }

  const comparePassword = await getVendor.validatePassword(password);
  if (!comparePassword) {
    return errorResponse(res, 400, 'Email/Password incorrect');
  }

  const token = generateToken({ email });
  const vendor = await getVendor.getSafeDataValues();

  return successResponse(res, 200, 'Login successful', { vendor, token });
};
