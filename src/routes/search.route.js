import { Router } from 'express';
import getProduct from '../controllers/search.controller';

const searchRoute = Router();

searchRoute.get(
  '/',
  getProduct
);

export default searchRoute;
