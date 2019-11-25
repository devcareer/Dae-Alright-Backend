import { Router } from 'express';
import {
  getAllProduct, createProduct, getSpecificProduct, deleteOneProduct, updateProduct
} from '../controllers/product.controller';

const productRoute = Router();

productRoute.get(
  '/product',
  getAllProduct
);

productRoute.get(
  '/product/:product_id',
  getSpecificProduct
);

productRoute.post(
  '/product',
  createProduct
);

productRoute.put(
  '/product/:product_id',
  updateProduct
);

productRoute.delete(
  '/product/:product_id',
  deleteOneProduct
);

export default productRoute;
