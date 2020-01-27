const express = require("express");
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

const router = express.Router();

// users,user, delete,block

router.use([getAccessToRoute,getAdminAccess]);

router.get("/users",getAllUsers);
router.get("/user/:id",getSingleUser);
router.get("/block/:id",getBlockUser);
router.delete("/user/:id",deleteUser);


module.exports = router;
