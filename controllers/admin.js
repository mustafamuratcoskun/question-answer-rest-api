const User = require("../models/User");
const errorWrapper = require("../helpers/errorWrapper");
const CustomError = require("../helpers/customError");


const getAllUsers = errorWrapper(async(req,res,next) => {

    const users = await User.find({});

    return res
    .status(200)
    .json({
        success : true,
        count : users.length,
        data : users
    });
});
const getSingleUser = errorWrapper(async(req,res,next) => {
    
    const {id} = req.params;
    const result = await getUserById(id);

    if (!result.success) {
        return next(result.error);
    }
   
    return res
    .status(200)
    .json({
        success : true,
        data : result.user
    });
});
const deleteUser = errorWrapper(async (req,res,next) => {
    const {id} = req.params;

    const result = await getUserById(id);

    if (!result.success) {
        return next(result.error);
    }

    await User.deleteOne({_id : id});

    return res.status(200)
    .json({
        success : true,
        data: {}
    });


});
const getBlockUser = errorWrapper(async(req,res,next) => {

    const {id} = req.params;
    
    const result = await getUserById(id);
    if (!result.success) {
        return next(result.error);

    }
    const {user} = result;
   
    await User.updateOne({_id : user._id},{blocked : !user.blocked});

    return res
    .status(200)
    .json({
        success : true,
        message : "User Blocked Successfully"
    });

});

const getUserById = async (id) => {
    
    const user = await User.findById(id);
    
    if (!user) {
        return {
            success : false,
            error : new CustomError(`User Not Found with Id : ${id}`,404)
        }
        
    }
    return {
            success: true,
            user
        }
    
}
module.exports = {
    getAllUsers,
    getSingleUser,
    deleteUser,
    getBlockUser

}

