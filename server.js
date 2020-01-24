const express = require("express");
const connectDatabase = require("./config/js/connectDatabase");
const errorHandler = require("./middlewares/errors/errorHandler");
const path = require("path");
const photoUpload = require("./config/js/multer");
const getAccessToRoute = require("./middlewares/authorization/auth");



const dotenv = require("dotenv");

dotenv.config({path : "./config/env/config.env"});

// MongoDb Connection
connectDatabase();

const routes = require("./routes");

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/v1",routes);


app.get("/sendmail",async (req,res,next) => {
    try {
        await require("./config/js/sendEmail")({
            from: process.env.SMTP_EMAIL, // sender address
            to: "coskun.m.murat@gmail.com", // list of receivers
            subject: "Reset Password Token", // Subject line
            html: "Reset Your Password" // html body
        });
        res.status(200)
        .json({
            success : true,
            message : "Email Sent"
        });
    }
    catch(err) {
        return next(new CustomError("Email Could Not Be Sent",500));
    }

});

// Static Files - Uploads
app.use(express.static("public"));

// Error Handler Middleware
app.use(errorHandler);

app.listen(PORT,() => {
    console.log(`App Started on ${PORT} - Environment : ${process.env.NODE_ENV} `);
    
});
