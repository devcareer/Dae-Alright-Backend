import { Router } from 'express';
import authRoute from './auth.route';
import welcomeRoute from './welcome.route';

const routes = Router();

routes.use('/auth', authRoute);
routes.use('/', welcomeRoute);

export default routes;
