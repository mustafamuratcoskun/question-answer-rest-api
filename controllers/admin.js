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
    
    const user = await User.findById(id);
    
    if (!user) {
        return next(new CustomError(`User Not Found with Id : ${id}`,404));
    }

    return res
    .status(200)
    .json({
        success : true,
        data : user
    })
});

module.exports = {
    getAllUsers,
    getSingleUser

}

