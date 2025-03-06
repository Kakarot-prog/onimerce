import nodemailer from "nodemailer"

export const sendEmail = async (info)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS
        }
    });

    const options = {
        from: process.env.MAIL,
        to: info.email,
        subject: "verification",
        html: info.text
    }

    await transporter.sendMail(options);
 
}