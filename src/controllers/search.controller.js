import sequelize from 'sequelize';
import client from './product.controller';
import database from '../database/models';
import { successResponse, serverError, errorResponse } from '../helpers/response';

const Sequelize = sequelize;
const { Op } = Sequelize;
const { Product } = database;

/**
 * Creates a index successfully
 *
 * @param {obj} req The request object
 * @param {obj} res The response object
 * @returns {json} The response from db or error
 */

const getProduct = async (req, res) => {
  const { productId, name, price } = req.query;
  try {
    const body = {
      query: {
        bool: {
          should: [
            {
              match: {
                name
              }
            },
            {
              match: {
                price
              }
            }
          ]
        }
      }
    };

    const product = await client.search({
      index: 'product',
      body,
      ignore: [404],
    });
    if (!product) {
      const products = Product.findAll({
        where: {
          [Op.or]: [{ id: productId },
            { name },
            { price },
            {
              name,
              [Op.and]: { price }
            }]
        }
      });
      if (products) {
        return successResponse(res, 200, ' ', { product: products });
      }
      return errorResponse(res, 404, 'no such products');
    }

    return successResponse(res, 200, ' ', { products: product.hits.hits });
  } catch (error) {
    return serverError(res);
  }
};

export default getProduct;
