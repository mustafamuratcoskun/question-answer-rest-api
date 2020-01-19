const express = require("express");

const dotenv = require("dotenv");
dotenv.config({path : "./config/config.env"});


const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`App Started on ${PORT} - Environment : ${process.env.NODE_ENV} `);
    
});
