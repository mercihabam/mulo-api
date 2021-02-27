const multer = require("multer");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const fs = require("fs");

function imageFilter(req, file, cb){
    if(file.mimetype.startsWith("image")){
        cb(null, true);
    }else{
        cb("veuillez téléchager seulement les images", false)
    }
    console.log(file);
};

const storageCompany = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, __dirname + "../../../public/images/companys");
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}-company-${file.originalname}`)
    }
});

const uploadCompanyImage = multer({ storage: storageCompany, fileFilter: imageFilter });

module.exports = {
    uploadCompanyImage,
}