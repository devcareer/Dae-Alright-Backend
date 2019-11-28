import elasticsearch from 'elasticsearch';
import trueOffset from '../helpers/search';
import database from '../database/models';
import { successResponse, serverError, errorResponse } from '../helpers/response';


const { Product, Vendor } = database;

/**
 * Creates a product successfully
 *
 * @param {obj} req The request object
 * @param {obj} res The response object
 * @returns {json} The response from db or error
 */

export const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

export const createProduct = async (req, res) => {
  try {
    const {
      name, price, quantity, description
    } = req.body;
    const createdAt = new Date();
    const image = req.file;

    if (!image) {
      return errorResponse(res, 422, 'error', { error: 'attached file is not an image, please select image' });
    }
    const imageUrl = image.path;
    const newProduct = await Product.create({
      name,
      price,
      quantity,
      description,
      createdAt,
      imageUrl
    });
    if (newProduct) {
      (() => {
        client.index({
          id: req.body.id,
          index: 'product',
          body: {
            name,
            price,
            quantity,
            description,
            imageUrl
          }
        });
      })();
      newProduct.save();

      return successResponse(res, 201, 'product successfully added');
    }
  } catch (error) {
    return serverError(res);
  }
};


export const getAllProduct = async (req, res) => {
  try {
    const Offset = await trueOffset(req.query.page);

    const productList = await Product.findAll({
      include: [
        {
          model: Vendor,
          where: {
            name: req.query.restaurant
          }
        }
      ],
      offset: Offset,
      limit: 10
    });

    return successResponse(res, 200, ' ', { products: productList });
  } catch (error) {
    return serverError(res);
  }
};

export const getSpecificProduct = (req, res) => {
  try {
    const oneProduct = Product.findById({
      id: req.params.productId,
      include: [
        {
          model: Vendor,
          where: {
            name: req.query.restaurant
          }
        }
      ]
    });

    if (!oneProduct) {
      return errorResponse(res, 404, 'no such products');
    }

    return successResponse(res, 200, ' ', { products: oneProduct });
  } catch (error) {
    return serverError(res);
  }
};


export const updateProduct = (req, res) => {
  const newName = req.body.name;
  const newPrice = req.body.price;
  const newQuantity = req.body.quantity;
  const newDescription = req.body.description;
  const newUpdatedAt = new Date.now();
  const image = req.file;

  Product.findById(req.params.productId)
    .then((prod) => {
      prod.name = newName;
      prod.price = newPrice;
      prod.quantity = newQuantity;
      prod.description = newDescription;
      prod.updatedAt = newUpdatedAt;
      if (image) {
        prod.imageUrl = image.path;
      }
      return prod.save();
    }).then(updatedItem => {
      client.updateByQuery({
        index: 'product',
        body: {
          query: { match: { id: req.params.productId } },
          doc: {
            name: updatedItem.name,
            price: updatedItem.price,
            quantity: updatedItem.quantity,
            description: updatedItem.description,
            imageUrl: updatedItem.imageUrl
          }
        }
      });
      return successResponse(res, 200, 'successfully updated');
    })
    .catch(() => serverError(res));
};

export const deleteOneProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findById(req.params.productId);
    deleteProduct.destroy();

    if (deleteProduct) {
      // delete from index too
      client.deleteByQuery({
        index: 'product',
        body: {
          query: {
            match: {
              id: req.params.productId
            }
          }
        }
      });
      // return sucess response

      return successResponse(res, 203, `deleted ${deleteProduct} successfully`);
    }

    return errorResponse(res, 404, 'no such product');
  } catch (error) {
    serverError(res);
  }
};
