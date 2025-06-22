// import { transporter } from "@/utils/nodemailer";
import nodemailer from "nodemailer";
export async function GET(request: Request) {
  return Response.json({ server: "server is runnig" });
}
export async function POST(request: Request) {
  const email = process.env.EMAIL;
  const pass = process.env.PASS;

  try {
    const data = await request.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      // service: "gmail",
      auth: {
        user: email,
        pass: pass,
      },
    });

    const htmlEmailBody = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>This is the Email Subject</title>
        </head>
        <body>
            <div>
                <h1>Hello, my name is ${data.name}</h1>
                <p>${data.email}</p>
                <h3>${data.message}.</h3>
               
            </div>
        </body>
        </html>
    `;

    const result = await transporter.sendMail({
      from: data.email,
      to: process.env.EMAIL,
      subject: `${data.name} have send you mail with ${data.email} address.`,
      text: data.message,
      html: htmlEmailBody,
    });
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ success: false });
  }
}
