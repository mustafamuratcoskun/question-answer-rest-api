const express = require("express");
const connectDatabase = require("./config/js/connectDatabase");
const errorHandler = require("./middlewares/errors/errorHandler");
const path = require("path");
const photoUpload = require("./config/js/multer");
const getAccessToRoute = require("./middlewares/authorization/auth");

// Security
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");


const dotenv = require("dotenv");

dotenv.config({path : "./config/env/config.env"});

// MongoDb Connection
connectDatabase();

const routes = require("./routes");

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 5000;



app.use(mongoSanitize());
app.use(helmet());

app.use("/api/v1",routes);


// Static Files - Uploads
app.use(express.static("public"));

// Error Handler Middleware
app.use(errorHandler);

app.listen(PORT,() => {
    console.log(`App Started on ${PORT} - Environment : ${process.env.NODE_ENV} `);
    
});
