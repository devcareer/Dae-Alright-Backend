import sequelize from "sequelize";
import {client, trueOffset} from "../helpers/search";
import database from "../database/models";
import { successResponse, serverError, errorResponse } from "../helpers/response";


const {Product} = database;
const client = client();
const Sequelize = sequelize;
const Op = Sequelize.Op();

export const createProduct = async (req, res)=>{
    try {
        const name = req.body.name
        const price = req.body.price
        const quantity = req.body.quantity
        const description = req.body.description
        const createdAt = new Date.now()
        const image = req.file

        if (!image) {
            return errorResponse(res, 422, error={error:"attached file is not an image, please select image"} )
          }
          
        const imageUrl = image.path;

        const newProduct = await Product.create({
             name : name,
             price : price,
             quantity : quantity,
             description : description,
             createdAt : createdAt,
             imageUrl : imageUrl
        }); 
        
        if (newProduct){
            (()=>{
                client.index({
                    id:req.body.id,
                    index: "product",
                    body : {
                        "name" : name,
                        "price" : price,
                        "quantity" : quantity,
                        "description" : description,
                        "imageUrl" : imageUrl 
                    }
                })
            })();
            newProduct.save()

            return successResponse(res, 201, "product successfully added")
        }
    } catch (error) {
        return serverError(res)
    }
}


export const getProduct = async (req, res)=>{
    try {
        body={
            query:{
                bool:{
                    should:[
                        {match:{
                            name: req.query.name
                             }},
                        {match:{
                            price: req.query.price
                            }}
                    ]
                }
            }
        }
        
        const product = await client.search({
                                    index: "product",
                                    body:body,
                                    ignore:[404],
                                })   
        if (!product){
           try{
               const products = Product.findAll({
                   where:{
                       [Op.or]:[{id: req.params.id},
                                {name: req.query.name},
                                {price: req.query.price},
                                {
                                    name: req.query.name,
                                    [Op.and] : {price: req.query.price} 
                            }]
                        }
                    })
               return successResponse(res, 200, " ", data={"products": products });
           }catch{
            //do nothing
           }
           return errorResponse(res, 404, "no such products");
        }
        
        return successResponse(res, 200, " ", data={"products": product.hits.hits });
    } catch (error) {
        return serverError(error);
    }
}


export const getAllProduct = async (req, res)=>{
    try {
        const Offset = await trueOffset(req.query.page);

        const productList = await Product.findAll({
            include:[
                {
                    model:vendor,
                    where:{name:req.params.restaurant}
                }
            ],
            offset: Offset, 
            limit:10
        })
       
        return successResponse(res, 200, " ", data={"products" : productList });
    } catch (error) {
        return serverError(res, error);
    }
} 


export const updateProduct = (req, res)=>{
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newQuantity = req.body.quantity;
    const newDescription = req.body.description;
    const newUpdatedAt = new Date.now();
    const image = req.file;

    Product.findById(req.params.id)
    .then((prod)=>{
        prod.name = newName
        prod.price = newPrice
        prod.quantity = newQuantity
        prod.description = newDescription
        prod.updatedAt = newUpdatedAt
        if(image){
            prod.imageUrl = image.path;
        }
        return prod.save()
    }).then(updatedItem=>{
        client.updateByQuery({
            index: "product",
            body: { 
              "query": { "match": { "id": req.params.id } }, 
              "doc": { 
                  "name":updatedItem.name,
                  "price":updatedItem.price,
                  "quantity":updatedItem.quantity,
                  "description":updatedItem.description,
                  "imageUrl":updatedItem.imageUrl,
                }
           }
        })
        return successResponse(res, 200, `successfully updated`);
    })
    .catch(serverError(res, error))
}  
        
export const deleteProduct = async (req, res)=>{
    try {
        const deleteProduct = await Product.findById(req.params.product_id)
        deleteProduct.destroy();

        if (deleteProduct){
          //delete from index too 
            client.deleteByQuery({
                index:"product",
                body:{
                    "query":{
                        "match":{
                            "id": req.params.product_id
                        }
                    }
                }
            })
          //return sucess response 
          return successResponse(res, 203, `deleted ${Deleteproduct} successfully`); 
        }

        return errorResponse(res, 404, "no such product");
    } catch (error) {
        serverError(res, error)
    }
}