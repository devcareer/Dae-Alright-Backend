import { Router } from 'express';
import { getVendor, getVendors } from '../controllers/vendors';
import searchVendor from '../controllers/vendor.search';


const vendorRoute = Router();

vendorRoute.get('/', getVendors);
vendorRoute.get('/:id', getVendor);
vendorRoute.get('/location/search', searchVendor);


export default vendorRoute;
