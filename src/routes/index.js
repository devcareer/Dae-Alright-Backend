import { Router } from 'express';

import authRoute from './auth.route';
import googleRoute from './google-routes';
import facebookRoute from './facebook-routes';
import vendorRoute from './vendor.route';
import searchRoute from './search.route';
import productRoute from './product.route';

const routes = Router();
routes.use('/auth/google', googleRoute);
routes.use('/auth/facebook', facebookRoute);

routes.use('/auth', authRoute);

routes.use('/search', searchRoute);
routes.use('/products', productRoute);
routes.use('/vendors', vendorRoute);
routes.use('/vendor', vendorRoute);

export default routes;
