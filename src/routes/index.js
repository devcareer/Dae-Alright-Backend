import { Router } from 'express';
import authRoute from './auth.route';
import googleRoute from './google-routes';
import facebookRoute from './facebook-routes';
import getProduct from '../controllers/product.controller';
import productRoute from './product.route';


const routes = Router();
routes.use('/auth/google', googleRoute);
routes.use('/auth/facebook', facebookRoute);

routes.use('/auth', authRoute);


routes.get('/search', getProduct);
routes.use('/:restaurant_name', productRoute);

export default routes;
