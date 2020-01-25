const User = require("../models/User");
const errorWrapper = require("../helpers/errorWrapper");
const CustomError = require("../helpers/customError");


const getAllUsers = errorWrapper(async(req,res,next) => {

    const users = await User.find({});

    return res
    .status(200)
    .json({
        success : true,
        data : users
    });
});

module.exports = {
    getAllUsers

}

