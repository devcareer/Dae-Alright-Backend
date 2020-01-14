import Sequelize from 'sequelize';

import database from '../database/models';
import { successResponse, errorResponse, serverError } from '../helpers/response';

const { Vendor, Product } = database;

/**
 * Search and retrieve vendors by location
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
      ],
      where: {
        location: {
          [Sequelize.Op.substring]: req.query.location
        }
      },
      include: [
        {
          model: Product,
          attributes: [
            'id',
            'name',
            'price',
            'imageUrl',
            'description'
          ],
          limit: 3
        }
      ]
    });
    if (!vendors.length) {
      return errorResponse(res, 404, 'No Restaurant found in this location');
    }
    return successResponse(
      res,
      200,
      `${vendors.length} vendors retrieved successfully`, { vendors }
    );
  } catch (error) {
    return serverError(res);
  }
};

export default getVendors;
