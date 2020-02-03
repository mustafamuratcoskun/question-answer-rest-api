const express = require("express");
const User = require("../models/User");

const {
    getAccessToRoute,
    getAdminAccess

} = require("../middlewares/authorization/auth");
const {
    getAllUsers,
    getSingleUser,
    deleteUser,
    getBlockUser
}  = require("../controllers/admin");

const {advanceQueryMiddleware} = require("../middlewares/helpers/query/advanceQueryHelper");

const {
    checkUserExist
} = require("../middlewares/helpers/database/databaseErrorHelpers");

const router = express.Router();

// users,user, delete,block

router.use([getAccessToRoute,getAdminAccess]);

router.get("/users",advanceQueryMiddleware(User),getAllUsers);
router.get("/user/:id",checkUserExist,getSingleUser);
router.get("/block/:id",checkUserExist,getBlockUser);
router.delete("/user/:id",checkUserExist,deleteUser);


module.exports = router;
