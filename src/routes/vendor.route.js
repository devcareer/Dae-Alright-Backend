import { Router } from 'express';
import { getVendor, getVendors } from '../controllers/vendors';


const vendorRoute = Router();

vendorRoute.get('/', getVendors);
vendorRoute.get('/:id', getVendor);


export default vendorRoute;
