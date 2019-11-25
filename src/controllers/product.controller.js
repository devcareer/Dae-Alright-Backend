import sequelize from 'sequelize';
import elasticsearch from 'elasticsearch';
import trueOffset from '../helpers/search';
import database from '../database/models';
import { successResponse, serverError, errorResponse } from '../helpers/response';


const { Product, Vendor } = database;
const Sequelize = sequelize;
const Op = Sequelize.Op();

const client = new elasticsearch.Client({
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
      name: name,
      price: price,
      quantity: quantity,
      description: description,
      createdAt: createdAt,
      imageUrl: imageUrl
    });
    if (newProduct) {
      (() => {
        client.index({
          id: req.body.id,
          index: 'product',
          body: {
            name: name,
            price: price,
            quantity: quantity,
            description: description,
            imageUrl: imageUrl
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


export const getProduct = async (req, res) => {
  try {
    const body = {
      query: {
        bool: {
          should: [
            {
              match: {
                name: req.query.name
              }
            },
            {
              match: {
                price: req.query.price
              }
            }
          ]
        }
      }
    };

    const product = await client.search({
      index: 'product',
      body: body,
      ignore: [404],
    });
    if (!product) {
      const products = Product.findAll({
        where: {
          [Op.or]: [{ id: req.params.product_id },
            { name: req.query.name },
            { price: req.query.price },
            {
              name: req.query.name,
              [Op.and]: { price: req.query.price }
            }]
        }
      });
      if (products) {
        return successResponse(res, 200, ' ', { products: products });
      }
      return errorResponse(res, 404, 'no such products');
    }

    return successResponse(res, 200, ' ', { products: product.hits.hits });
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
            name: req.params.restaurant_name
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
    const oneProduct = Product.findById(req.params.product_id);
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

  Product.findById(req.params.product_id)
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
          query: { match: { id: req.params.product_id } },
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
    const deleteProduct = await Product.findById(req.params.product_id);
    deleteProduct.destroy();

    if (deleteProduct) {
      // delete from index too

      client.deleteByQuery({
        index: 'product',
        body: {
          query: {
            match: {
              id: req.params.product_id
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
