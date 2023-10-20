const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmail = async (email, subject, attachment) => {
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "Gmail",
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            attachments: attachment,
        });
        console.log("Email sent successfully to ", email);
    } catch (error){
        console.log(error, "Email not sent")
    }
}

module.exports = sendEmail;