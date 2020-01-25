const express = require("express");
const {
    getAccessToRoute,
    adminAccess

} = require("../middlewares/authorization/auth");
const {
    getAllUsers,
    getSingleUser,
    deleteUser
}  = require("../controllers/admin");

const router = express.Router();

// users,user, delete,block

router.use([getAccessToRoute,adminAccess]);

router.get("/users",getAllUsers);
router.get("/user/:id",getSingleUser);
router.delete("/user/:id",deleteUser);


module.exports = router;
