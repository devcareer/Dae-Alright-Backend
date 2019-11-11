import { Router } from 'express';
import authRoute from './auth.route';
import googleRoute from './google-routes';
import facebookRoute from './facebook-routes';

const routes = Router();

routes.use('/auth', authRoute);
routes.use('/auth/google', googleRoute);
routes.use('/auth/facebook', facebookRoute);

export default routes;
