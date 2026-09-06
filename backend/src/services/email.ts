import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });
    console.log(`📧 Email sent to ${options.to}`);
  } catch (error) {
    console.error("❌ Email send failed:", error);
  }
}

export function contactNotificationEmail(data: {
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  subject: string;
  message: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a1a2e; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 12px; }
        .label { font-weight: bold; color: #1a1a2e; }
        .footer { text-align: center; padding: 15px; font-size: 12px; color: #888; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Submission</h2>
        </div>
        <div class="content">
          <div class="field"><span class="label">Name:</span> ${data.name}</div>
          <div class="field"><span class="label">Email:</span> ${data.email}</div>
          ${data.phone ? `<div class="field"><span class="label">Phone:</span> ${data.phone}</div>` : ""}
          <div class="field"><span class="label">Inquiry Type:</span> ${data.inquiryType}</div>
          <div class="field"><span class="label">Subject:</span> ${data.subject}</div>
          <div class="field"><span class="label">Message:</span></div>
          <p>${data.message}</p>
        </div>
        <div class="footer">Johnnie Boy's Foundation — Contact Form</div>
      </div>
    </body>
    </html>
  `;
}

export function autoReplyEmail(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a1a2e; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .footer { text-align: center; padding: 15px; font-size: 12px; color: #888; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Thank You for Reaching Out</h2>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          <p>Thank you for contacting Johnnie Boy's Foundation. We have received your message and will get back to you within 24 hours.</p>
          <p>In the meantime, feel free to learn more about our work at <a href="https://johnnieboysfoundation.org">our website</a>.</p>
          <p>Warm regards,<br/>The Johnnie Boy's Foundation Team</p>
        </div>
        <div class="footer">Guiding Boys to Greatness</div>
      </div>
    </body>
    </html>
  `;
}
