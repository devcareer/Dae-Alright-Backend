import { Router } from 'express';
import authRoute from './auth.route';
import googleRoute from './google-routes';
import facebookRoute from './facebook-routes';
import welcomeRoute from './welcome-route';

const routes = Router();

routes.use('/auth', authRoute);
routes.use('/auth/google', googleRoute);
routes.use('/auth/facebook', facebookRoute);
routes.use('/', welcomeRoute);

export default routes;
