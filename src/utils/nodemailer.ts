import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.PASS;

// console.log(email, pass);

// props.put("mail.smtp.auth", "true");
//         props.put("mail.smtp.starttls.enable", "true");
//         props.put("mail.smtp.host", "smtp.gmail.com");
//         props.put("mail.smtp.port", "587");

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // service: "gmail",
  auth: {
    user: email,
    pass: pass,
  },
});

// export const mailOption = {
//     // from: "mdsukkur9057@gmail.com",
//     // to: "mr7aali@gmail.com"

//     to: "", // Add any other default options you need
//     subject: "",
//     text: "",
//     html: "",
// };
