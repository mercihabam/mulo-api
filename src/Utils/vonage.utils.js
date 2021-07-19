const Vonage = require('@vonage/server-sdk')
require('dotenv').config();

const VONAGE_API_KEY = process.env.VONAGE_KEY
const VONAGE_API_SECRET = process.env.VONAGE_SECRET

const vonage = new Vonage({
  apiKey: VONAGE_API_KEY,
  apiSecret: VONAGE_API_SECRET
});

function sendSmsOrder(to, deliveryCode){
    vonage.message.sendSms('Mulo', to, `Vous avez une nouvelle commande, le code de livraison de la commande est ${deliveryCode}`, (err, res) =>{
        if(err){
            console.log(err);
        }else{
            if(res.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${res.messages[0]['error-text']}`);
            }
        }
    })
};

module.exports = {
    sendSmsOrder
}