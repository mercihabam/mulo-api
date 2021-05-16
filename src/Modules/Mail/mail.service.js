"use strict";
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ACCOUNT, // generated ethereal user
    pass: process.env.EMAIL_PASS, // generated ethereal password
  },
});


// async..await is not allowed in global scope, must use a wrapper
async function sendOrderToAdmin(codeDelivery, user, to) {

  let html = `
        <h1>Vous avez une nouvelle commande de ${user.firstName} ${user.lastName}</h1>
        <p>
            Le code de livraison de la commande est <h2>${codeDelivery}<h2>
        </p>
    `

  // create reusable transporter object using the default SMTP transport
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
};

async function sendPassToUser(data, to){

  let html = `
        Bonjour <h1>${data.firstName} ${data.lastName} </h1>
        Vous avez été inscrit dans l'entreprise ${data.company} comme ${data.role}
        <p>
            Votre mot de passe de connexion est <h2>${data.password}<h2>
        </p>
    `

  if(data.role){
    let info = await transporter.sendMail({
        from: `"Mulo Food 👻" ${process.env.EMAIL_ACCOUNT}`, // sender address
        to: to, // list of receivers
        subject: "Inscription ✔", // Subject line
        text: "Hello world?", // plain text body
        html: html, // html body
    });
  }

};

async function sendPasswordResetEmail (email, token) {

  let html = `
        Salut
        nous avons réçu une requete de changement de mot de passe de votre compte Mulo <br/>
        Vous pouvez réinitialiser votre mot de passe en cliquant sur ce lien<br/>
        <a href="https://mulo-food.herokuapp.com/user/reset-pwd/${token}" >https://mulo-food.herokuapp.com/user/reset-pwd/${token}</a>
    `

  await transporter.sendMail({
    from: `"Mulo Food 👻" ${process.env.EMAIL_ACCOUNT}`, // sender address
    to: email, // list of receivers
    subject: "Reset password request", // Subject line
    text: "Hello world?", // plain text body
    html: html, // html body
  });
}

module.exports = {
    sendOrderToAdmin,
    sendPassToUser,
    sendPasswordResetEmail
}