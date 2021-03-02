const multer = require("multer");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const fs = require("fs");
const { sendResult } = require("../Utils/helper");

function imageFilter(req, file, cb, res){
    if(file.mimetype.startsWith("image")){
        cb(null, true);
    }else{
        cb("veuillez téléchager seulement les images", false);
        sendResult(res, 403, "veuillez telecharger seulement les images", null, null)
    }
};

const storageCompany = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, __dirname + "../../../public/images/companys");
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}-company-${file.originalname}`)
    }
});

const storageMenu = multer.diskStorage({
    destination : (req, file, cb) =>{
        cb(null, __dirname + "../../../public/images/menus")
    },
    filename : (req, file, cb) =>{
        cb(null, `${Date.now()}-menu-${file.originalname}`)
    }
});

const uploadCompanyImage = multer({ storage: storageCompany, fileFilter: imageFilter });
const uploadMenuImage = multer({ storage: storageMenu, fileFilter: imageFilter });

module.exports = {
    uploadCompanyImage,
    uploadMenuImage,
}