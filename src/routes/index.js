import { Router } from 'express';
import authRoute from './auth.route';
import googleRoute from './google-routes';
import facebookRoute from './facebook-routes';

const routes = Router();
routes.use('/auth/google', googleRoute);
routes.use('/auth/facebook', facebookRoute);

routes.use('/auth', authRoute);

export default routes;
