const Menus = require("../models/menus");
const Companys = require("../models/companys");
const cartitem = require("../models/cartItems");
const User = require("../models/users");
const Cart = require("../models/cart");
const Orders = require("../models/orders");

//menus with companys
Companys.hasMany(Menus, { as: "Menus", foreignKey: "companyId" });
Menus.belongsTo(Companys, { as: "Resto", foreignKey: "companyId" });

//cart-items with menus
Menus.hasMany(cartitem, { as: "Item", foreignKey: "menuId" });
cartitem.belongsTo(Menus, { as: "Menu", foreignKey: "menuId" });

//user with cart-items
User.hasMany(cartitem, { as: "Items", foreignKey: "userId" });
cartitem.belongsTo(User, { as: "User", foreignKey: "userId" });

Cart.hasMany(cartitem, { as: "Items", foreignKey: "cartId" });
cartitem.belongsTo(Cart, { as: "Cart", foreignKey: "cartId" });

//orders with menus
Menus.hasMany(Orders, { as: "Order", foreignKey: "itemId" });
Orders.belongsTo(Menus, { as: "Item", foreignKey: "itemId" });

//cart with orders
Cart.hasOne(Orders, { as: "Cart", foreignKey: "cartId" });
Orders.belongsTo(Cart, { as: "Cart", foreignKey: "cartId" });