const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'emailul.tau@gmail.com',
    pass: 'parolaEmailuluiTau'
  }
});

module.exports = transporter;
