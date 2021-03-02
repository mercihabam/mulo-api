const Menus = require("../models/menus");
const Companys = require("../models/companys");
const cartitem = require("../models/cartItems");
const User = require("../models/users");

//menus with companys
Companys.hasMany(Menus, { as: "Menus", foreignKey: "companyId" });
Menus.belongsTo(Companys, { as: "Resto", foreignKey: "companyId" });

//cart-items with menus
Menus.hasOne(cartitem, { as: "Menu", foreignKey: "menuId" });
cartitem.belongsTo(Menus, { as: "Menu", foreignKey: "menuId" });

//user with cart-items
User.hasMany(cartitem, { as: "Items", foreignKey: "userId" });
cartitem.belongsTo(User, { as: "User", foreignKey: "userId" });