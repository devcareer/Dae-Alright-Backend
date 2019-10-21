import { Router } from 'express';
import response from '../helpers/response';

const welcomeRoute = Router();

welcomeRoute.get('/', (req, res) => {
  response.setSuccess(200, 'Welcome to Dae Alright API');
  return response.send(res);
});

welcomeRoute.get('/*', (req, res) => {
  response.setError(404, 'The endpoint does not exist');
  return response.send(res);
});

export default welcomeRoute;
