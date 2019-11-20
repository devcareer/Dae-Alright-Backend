import {Router} from "express"
import {getAllProduct, createProduct,
        getProduct, deleteProduct, updateProduct} from "../controllers/product.controller"

productRoute = Router();


productRoute.get("/:restaurant_name/product", getAllProduct);
productRoute.get("/search", getProduct);
productRoute.post("/:restaurant_name/product", createProduct);
productRoute.put("/:restaurant_name/product/:product_id", updateProduct);
productRoute.delete("/:restaurant_name/product/:product_id", deleteProduct);


export default productRoute;

