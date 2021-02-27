const Menus = require("../models/menus");
const Companys = require("../models/companys");

//menus with companys
Companys.hasMany(Menus, { as: "Menus", foreignKey: "companyId" });
Menus.belongsTo(Companys, { as: "Resto", foreignKey: "companyId" });