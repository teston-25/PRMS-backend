const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"PRMS Support" <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Click the button below to reset your password:</p>
        <a href="${options.resetURL}" style="display: inline-block; background: #007bff; color: #fff; padding: 10px 15px; border-radius: 5px; text-decoration: none;">Reset Password</a>
        <p>If you did not request this, just ignore this email.</p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
