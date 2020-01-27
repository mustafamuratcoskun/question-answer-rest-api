const express = require("express");

const {
    askNewQuestion
} = require("../controllers/question");

const {
    getAccessToRoute
} = require("../middlewares/authorization/auth");

 

const router = express.Router();


// Ask New Question
// Permissions - Only Logged In Users

router.post("/ask",getAccessToRoute,askNewQuestion);

module.exports = router;
