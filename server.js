const express = require("express");
const connectDatabase = require("./helpers/database/connectDatabase");
const errorHandler = require("./middlewares/errors/errorHandler");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const limitAccess = require("./middlewares/security/limitAccess");
const hpp = require('hpp');
const cors = require('cors');
const dotenv = require("dotenv");
const routes = require("./routes");

// Environment Variables

dotenv.config({path : "./config/env/config.env"});

// MongoDb Connection
connectDatabase();


// Creating Our Server

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Security

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(limitAccess({
    windowMs: 10 * 60 * 1000, // 10 Minutes
    max: 500    
}));
app.use(hpp());
app.use(cors());

// Routes

app.use("/api",routes);


// Static Files - Uploads
app.use(express.static("public"));

// Error Handler Middleware
app.use(errorHandler);

// Starting Our Server
app.listen(PORT,() => {
    console.log(`App Started on ${PORT} - Environment : ${process.env.NODE_ENV} `);
    
});
