const express = require('express');

const app = express();
const cookieParser = require("cookie-parser");
const Routes = require("./src/Routes");
const dotenv = require("dotenv");
// const bodyParser = require('body-parser');
const cors = require("cors");

dotenv.config();

//connect db
require("./src/Database/connection/connection");
//association
require("./src/Database/associations/association");

const whitelist = ['https://mulo-food.herokuapp.com', 'http://localhost:3000']
const corsOptions = {
  origin: function (origin, path, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    }else if(path){
      callback(null, true)
    }else {
      callback(new Error('origin ' +  origin + ' Not allowed by CORS'))
    }
  },
  credentials: true
}

//middlwares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions))
app.use("/public", express.static('public'));

//Routes
app.use("/Api/v1", Routes);


const PORT = process.env.PORT || 8000
app.listen(PORT, () =>{
    console.log(`dish project is runig at http://localhost:${PORT}`);
})