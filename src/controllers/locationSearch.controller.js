import sequelize from 'sequelize';
import  Vendor  from '../database/models/vendor.js';
import { successResponse, errorResponse, serverError } from '../helpers/response';
const Sequelize = sequelize;
const { Op } = Sequelize;

const getByLocation = async (req,res) =>{
    try{ 
        let vendors = await Vendor.findAll({
            where:{
                location:req.params.location,
            }
        });
        if (vendors) {
            return successResponse(res, 200, ' ', { vendors });
        }
        return errorResponse(res, 404, 'no vendors');

    }catch (error) {
        return serverError(res);
    }
}

export default getByLocation;