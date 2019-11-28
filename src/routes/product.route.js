import { Router } from 'express';
import {
  getAllProduct, createProduct, getSpecificProduct, deleteOneProduct, updateProduct
} from '../controllers/product.controller';

const productRoute = Router();

productRoute.get(
  '/',
  getAllProduct
);

productRoute.get(
  '/:productId',
  getSpecificProduct
);

productRoute.post(
  '/',
  createProduct
);

productRoute.put(
  '/:productId',
  updateProduct
);

productRoute.delete(
  '/:productId',
  deleteOneProduct
);

export default productRoute;