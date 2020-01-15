import { Router } from 'express';
import { getVendor, getVendors } from '../controllers/vendors';
import searchVendor from '../controllers/vendor.search';
import getProductsByVendor from '../controllers/vendor-product-detail';


const vendorRoute = Router();

vendorRoute.get('/', getVendors);
vendorRoute.get('/:id', getVendor);
vendorRoute.get('/location/search', searchVendor);
vendorRoute.get('/products/:vendorId', getProductsByVendor);


export default vendorRoute;
