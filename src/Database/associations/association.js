const Menus = require("../models/menus");
const Companys = require("../models/companys");
const cartitem = require("../models/cartItems");
const User = require("../models/users");
const OrderItems = require("../models/orderItems");
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

Orders.hasMany(OrderItems, { as: "Items", foreignKey: "orderId" });
OrderItems.belongsTo(Orders, { as: "Order", foreignKey: "orderId" });

//cartItem with orderItems
cartitem.hasOne(OrderItems, { as: "Item", foreignKey: "itemId" });
OrderItems.belongsTo(cartitem, { as: "Item", foreignKey: "itemId" });

//orders with users
User.hasMany(Orders, { as: "Orders", foreignKey: "userId" });
Orders.belongsTo(User, { as: "User", foreignKey: "userId" });