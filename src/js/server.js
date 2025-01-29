/**
 * src/server.js
 *
 * Run with: node src/server.js
 * or via "npm start" if you configure your package.json
 */
const express = require('express');
const nodemailer = require('nodemailer');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// Serve all files in the "public" folder as static
app.use(express.static('public'));

/**
 * POST /send_email
 * Receives form data from the front end and sends an email.
 */
app.post('/send_email', async (req, res) => {
  try {
    const { fullname, email, subject, message } = req.body;

    // Basic validation
    if (!fullname || !email || !subject || !message) {
      return res
        .status(400)
        .json({ error: 'Please fill all required fields.' });
    }

    // Set up a transporter (example: Ethereal, for testing).
    // Replace with your real SMTP details (e.g., Gmail, SendGrid, etc.)
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',  // or e.g. 'smtp.gmail.com'
      port: 587,
      auth: {
        user: 'georgebailey065@gmail.com',  // replace
        pass: 'bdcz leow wjze lkml',  // replace
      },
    });

    // Mail options
    let mailOptions = {
      from: `"${fullname}" <${email}>`,  // e.g. 'John Doe <john@example.com>'
      to: 'joshuam6060@gmail.com',       // The address you want to receive submissions
      subject: subject,
      text: message,                     // plain text body
      // html: `<p>${message}</p>`       // (Optional) if you want HTML email
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res
      .status(500)
      .json({ error: 'Something went wrong. Please try again.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
