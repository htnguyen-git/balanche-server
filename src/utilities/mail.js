const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    secure: false,
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
    tls: {
        ciphers: "SSLv3"
    }
})

module.exports = {
    transporter
}