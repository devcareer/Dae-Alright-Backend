import database from '../database/models';
import { successResponse, errorResponse, serverError } from '../helpers/response';

const { Vendor, Product, Review } = database;

/**
 * Retrieve all products by a single vendor
 *
 * @param {obj} req The request object
 * @param {obj} res The response object
 * @returns {json} The response from db or error
 */
const getAllProducts = async (req, res) => {
  try {
    // get the vendor
    const vendorWithProducts = await Vendor.findByPk(req.params.vendorId, {
      attributes: [
        'id',
        'name',
        'email',
        'location',
        'phone',
      ],
      include: [
      // get and attach all the product owned by the vendor
        {
          model: Product,
          attributes: [
            'id',
            'name',
            'price',
            'imageUrl',
            'description'
          ]
        },
        // get and attach all customers reviews about the vendor
        {
          model: Review,
          attributes: [
            'id',
            'ratings',
            'title',
            'content',
            'userId'
          ]
        }
      ]
    });
    // return 404 if vendor is not found
    if (vendorWithProducts == null) {
      return errorResponse(res, 404, 'No vendor with such id');
    }
    // otherwise return the retrieved vendor data
    return successResponse(
      res,
      200,
      'vendor\'s product retrieved successfully', { vendor: vendorWithProducts }
    );
  } catch (error) {
    // nicely handle any server error
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

export default getAllProducts;
