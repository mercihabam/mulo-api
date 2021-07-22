require('dotenv').config();
const twilio = require("../Utils/twilio");

function sendOrderSms(to, deliveryCode){
    twilio.messages.create({
        to: to,
        messagingServiceSid: process.env.MSGSSID,
        body: `Vous avez une nouvelle commande, le code de livraison de la commande est ${deliveryCode}`
    }).then(res =>{
        console.log(res);
    }).catch(err =>{
        console.log(err);
    })
};

module.exports = {
    sendOrderSms
}