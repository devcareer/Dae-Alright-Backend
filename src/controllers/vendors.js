import database from '../database/models';
import { successResponse, errorResponse, serverError } from '../helpers/response';

const { Vendor } = database;

/**
 * Creates a user successfully
 *
 * @param {obj} req The request object
 * @param {obj} res The response object
 * @returns {json} The response from db or error
 */
const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'location',
        'phone',
      ]
    });
    if (!vendors.length) return [];
    return successResponse(
      res,
      200,
      `${vendors.length} vendors retrieved successfully`, { vendors }
    );
  } catch (error) {
    return serverError(error);
  }
};

const getVendor = async (req, res) => {
  const { id } = req.params;
  try {
    const vendor = await Vendor.findByPk(id, {
      attributes: [
        'id',
        'name',
        'email',
        'location',
        'phone',
      ]
    });
    if (vendor) {
      return successResponse(
        res,
        200,
        'vendor retrieved successfully', { vendor }
      );
    }
    return errorResponse(
      res,
      404,
      `No vendor with id ${id} in the system`
    );
  } catch (error) {
    if (error.name === 'SequelizeDatabaseError') {
      return errorResponse(
        res,
        400,
        'Please provide a valid vendorId'
      );
    }
    return serverError(res);
  }
};

export { getVendor, getVendors };
