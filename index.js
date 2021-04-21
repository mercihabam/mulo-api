const express = require('express');

const app = express();
const cookieParser = require("cookie-parser");
const Routes = require("./src/Routes");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require("cors");

dotenv.config();

//connect db
require("./src/Database/connection/connection");
//association
require("./src/Database/associations/association");

//middlwares
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/public", express.static('public'));

const whitelist = ['https://mulo-food.herokuapp.com', 'http://example2.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//Routes
app.use("/Api/v1", cors(corsOptions), Routes);


const PORT = process.env.PORT || 8000
app.listen(PORT, () =>{
    console.log(`dish project is runig at http://localhost:${PORT}`);
})