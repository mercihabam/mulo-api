const menuModel = require("../../../Database/models/menus");
const { sendResult } = require("../../../Utils/helper");

async function createMenu(req, res){
    const { name, type, price, currency, ready, companyId, ingredients} = req.body;
    const menu = await menuModel.create({
        name,
        type,
        image: req.file.filename,
        price,
        currency,
        ready,
        companyId,
        ingredients
    });
    if(menu){
        sendResult(res, 201, null, "Menu ajouté", menu)
    }else{
        sendResult(res, 500, null, "Impossible d'ajouter le menu", menu)
    }
};

async function deleteMenu(req, res){
    const menu = await menuModel.findOne({ where: { id: req.params.id } });
    if(menu){
        await menu.update({ deletedAt: new Date() });
        sendResult(res, 200, null, "menu supprimé", null)
    }else{
        sendResult(res, 404, "menu not found", null, null)
    }
};

async function updateMenu(req, res){
    const { name, type, image, price, currency, ready, companyId, ingredients} = req.body;

    const menu = await menuModel.findOne({ where: { id: req.params.id } });
    if(menu){
        const updated = await menu.update({
            name: name || menu.name,
            type: type || menu.type,
            image: image || menu.image,
            price: price || menu.price,
            currency: currency || menu.currency,
            ready: ready || menu.ready,
            companyId: companyId || menu.companyId,
            ingredients: ingredients || menu.ingredients,
            updatedAt: new Date()
        });
        sendResult(res, 200, null, "menu mis à jour", updated)
    }else{
        sendResult(res, 404, "menu not found", null, null)
    }
};

async function getMenus(req, res){
    const menus = await menuModel.findAndCountAll({ where: { deletedAt: null }, limit: parseInt(req.query.limit) || 10, offset: parseInt(req.query.offset) || 0 });
    sendResult(res, 200, null, null, menus);
};

async function getMenusByCompany(req, res){
    const menus = await menuModel.findAndCountAll({ where: { deletedAt: null, companyId: req.params.companyId }, limit: parseInt(req.query.limit) || 10, offset: parseInt(req.query.offset) || 0 });
    sendResult(res, 200, null, null, menus);
};

async function getMenuById(req, res){
    const menu = await menuModel.findOne({ where: { id: req.params.id } });
    if(menu){
        sendResult(res, 200, null, null, menu)
    }else{
        sendResult(res, 404, "menu not found", null, null)
    }
};

module.exports = {
    createMenu,
    deleteMenu,
    updateMenu,
    getMenus,
    getMenusByCompany,
    getMenuById
}