"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendOrderToAdmin(codeDelivery, user, to) {

  let html = `
        <h1>Vous avez une nouvelle commande de ${user.firstName} ${user.lastName}</h1>
        <p>
            Le code de livraison de la commande est <h2>${codeDelivery}<h2>
        </p>
    `

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ACCOUNT, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  if(codeDelivery){
    let info = await transporter.sendMail({
        from: `"Mulo Food 👻" ${process.env.EMAIL_ACCOUNT}`, // sender address
        to: to, // list of receivers
        subject: "Nouvelle commande ✔", // Subject line
        text: "Hello world?", // plain text body
        html: html, // html body
    });
  }
}

sendOrderToAdmin().catch(console.error);

module.exports = {
    sendOrderToAdmin,
}