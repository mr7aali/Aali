// import { transporter } from "@/utils/nodemailer";
import nodemailer from "nodemailer";
export async function GET(request: Request) {
  return Response.json({ server: "server is runnig" });
}
export async function POST(request: Request) {
  const email = process.env.EMAIL;
  const pass = process.env.PASS;

  if (!email || !pass) {
    return Response.json({
      success: false,
      message: "Email or password not set",
    });
  }

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
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(45deg, #4f46e5, #ec4899);
      padding: 20px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
    }
    .content h2 {
      color: #4f46e5;
      font-size: 20px;
      margin-top: 0;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
      margin: 10px 0;
    }
    .message-box {
      background-color: #f9fafb;
      border-left: 4px solid #10b981;
      padding: 15px;
      border-radius: 4px;
      font-style: italic;
    }
    .footer {
      background-color: #f4f4f9;
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <h2>From: ${data.name}</h2>
      <p><strong>Email:</strong> ${data.email}</p>
      <div class="message-box">
        <p>${data.message}</p>
      </div>
    </div>
    <div class="footer">
      <p>Received on ${new Date().toLocaleString()}</p>
      <p>This email was sent from your website's contact form.</p>
    </div>
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
    console.error("Error sending email:", err);
    return Response.json({ success: false });
  }
}
