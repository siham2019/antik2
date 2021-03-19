const nodemailer = require('nodemailer');


let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d94904ef3da931",
      pass: "8f925e8ddfbf7a"
    }
  });

exports.send = async options => {
    const message = {
      from: `antik <info@antik.com>`,
      to: options.userEmail,
      subject: options.subject,
      text: options.message
    }
  
    await transport.sendMail(message);

  }
  