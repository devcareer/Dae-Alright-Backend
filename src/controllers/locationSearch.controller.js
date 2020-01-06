import sequelize from 'sequelize';
import database from '../database/models';
import { successResponse, errorResponse, serverError } from '../helpers/response';

const getByLocation = async (req, res) => {
    try { 
        const vendors = await database.Vendor.findAll({
            where: {
                location: req.query.location,
            }
        });
        if (vendors) {
            return successResponse(res, 200, ' ', { vendors });
        }
        return errorResponse(res, 404, 'no vendors');
    }
    catch (error) {
        return serverError(res);
    }
};

export default getByLocation;
