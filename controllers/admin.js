const User = require("../models/User");
const errorWrapper = require("../helpers/error/errorWrapper");
const CustomError = require("../helpers/error/customError");



const getAllUsers = errorWrapper(async(req,res,next) => {    
    return res
    .status(200)
    .json(res.advanceQueryResults);
});
const getSingleUser = errorWrapper(async(req,res,next) => {
    
    const {id} = req.params;
    
    const user = await User.findById(id);

    return res
    .status(200)
    .json({
        success : true,
        data : user
    });
});
const deleteUser = errorWrapper(async (req,res,next) => {
    const {id} = req.params;

    const user = await User.findById(id);

    await user.remove();

    return res.status(200)
    .json({
        success : true,
        data: {}
    });


});
const getBlockUser = errorWrapper(async(req,res,next) => {

    const {id} = req.params;
    
    const user = await User.findById(id);
   
    await User.updateOne({_id : user._id},{blocked : !user.blocked});

    return res
    .status(200)
    .json({
        success : true,
        message : "User Blocked Successfully"
    });

});

module.exports = {
    getAllUsers,
    getSingleUser,
    deleteUser,
    getBlockUser

}

