const express = require("express");
const connectDatabase = require("./config/js/connectDatabase");
const errorHandler = require("./middlewares/errorHandler");


const dotenv = require("dotenv");

dotenv.config({path : "./config/env/config.env"});

// MongoDb Connection
connectDatabase();

const routes = require("./routes");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/v1",routes);



// Error Handler Middleware
app.use(errorHandler);

app.listen(PORT,() => {
    console.log(`App Started on ${PORT} - Environment : ${process.env.NODE_ENV} `);
    
});
