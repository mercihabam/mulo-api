const express = require("express");
const Routes = require("./Routes");
const app = express();

require("dotenv").config();

//connect db
require("./Database/connection/connection");


//Routes
app.use("/Api/v1", Routes);



const PORT = process.env.PORT || 8000
app.listen(PORT, () =>{
    console.log(`meal project is runig at http://localhost:${PORT}`);
})