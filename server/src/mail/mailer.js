const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'ferreira.cneel@gmail.com',
        pass: 'mewotylnvbtrwdfg'
    }
});

module.exports = transporter;