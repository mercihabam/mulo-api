const Menus = require("../models/menus");
const Companys = require("../models/companys");
const cartitem = require("../models/cartItems");
const Cart = require("../models/cart");
const User = require("../models/users");
const OrderItems = require("../models/orderItems");
const Orders = require("../models/orders");
const CompanyUser = require("../models/companyUser");

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

//cart with companys
Companys.hasMany(Cart, { as: "Carts", foreignKey: "companyId" });
Cart.belongsTo(Companys, { as: "Resto", foreignKey: "companyId" });

//user with Cart
User.hasOne(Cart, { as: "Cart", foreignKey: "userId" });
Cart.belongsTo(User, { as: "User", foreignKey: "userId" });

User.hasOne(CompanyUser, { as: "User", foreignKey: "userId" });
CompanyUser.belongsTo(User, { as: "User", foreignKey: "userId" });

//Cart with cartItems
Cart.hasMany(cartitem, { as: "Items", foreignKey: "cartId" });
cartitem.belongsTo(Cart, { as: "Cart", foreignKey: "cartId"});