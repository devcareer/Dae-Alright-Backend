import { Router } from 'express';
import  getByLocation  from '../controllers/locationSearch.controller';

const locationRoute = Router();

locationRoute.get('/',  getByLocation );

export default locationRoute;