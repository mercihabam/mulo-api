const Cart = require("../../../Database/models/cart");
const CartItems = require("../../../Database/models/cartItems");
const Orders = require("../../../Database/models/orders");
const { sendResult } = require("../../../Utils/helper");

async function createOrder(req, res){
    const { cartArray, itemId, adress, adress2 } = req.body;
    const codeDelivery = Math.round(Math.random() * (90000000-10000000) + 10000000);

    if( cartArray ){
        const cart = await Cart.create({ userId: req.user.id, ordered: true })
        cartArray.forEach(async(item) => {
            const cartItem = await CartItems.findOne({ where: { id: item } });
            if(cartItem){
                await cartItem.update({
                    cartId: cart.id,
                    ordered: true
                })
            }
        });
        const order = await Orders.create({ userId: req.user.id, cartId: cart.id, adress: adress, adress2: adress2, codeDelivery: codeDelivery });
        if(order){
            sendResult(res, 201, null, "opération effectuée", order);
        }
    }else{
        const order = await Orders.create({ userId: req.user.id, itemId: itemId, adress: adress, adress2: adress2, codeDelivery: codeDelivery });
        if(order){
            sendResult(res, 201, null, "opération effectuée", order);
        }
    }
}

module.exports = {
    createOrder,
}