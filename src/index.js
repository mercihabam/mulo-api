const express = require('express');

const app = express();
const cookieParser = require("cookie-parser");
const Routes = require("./Routes");
const dotenv = require("dotenv");

dotenv.config();

//connect db
require("./Database/connection/connection");

//middlwares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use("/Api/v1", Routes);


const PORT = process.env.PORT || 8000
app.listen(PORT, () =>{
    console.log(`dish project is runig at http://localhost:${PORT}`);
})