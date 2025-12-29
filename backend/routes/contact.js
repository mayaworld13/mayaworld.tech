const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {

  console.log("📩 Contact API hit");
  console.log("👉 Request body:", req.body);

  const { name, email, phone, message } = req.body;

  // Basic validation
  if (!name || !email || !phone || !message) {
    console.error("❌ Missing fields");
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  console.log("✅ ENV CHECK:");
  console.log("EMAIL_USER:", process.env.EMAIL_USER ? "SET" : "NOT SET");
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "SET" : "NOT SET");

  try {
    console.log("📨 Creating transporter...");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Verify SMTP connection
    await transporter.verify();
    console.log("✅ SMTP server verified");

    /* ===============================
       1️⃣ MAIL TO YOU (ADMIN)
    =============================== */
    console.log("📤 Sending mail to admin...");

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📩 New Contact Form Message",
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
      `
    });

    console.log("✅ Admin mail sent");

    /* ===============================
       2️⃣ AUTO-REPLY TO USER
    =============================== */
    console.log("📤 Sending auto-reply to user...");

    await transporter.sendMail({
  from: `"Mayank Sharma" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: " Welcome! Thanks for contacting me",
  html: `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #eee;">
      
      <!-- HEADER IMAGE -->
      <img 
        src="https://github.com/user-attachments/assets/9f4d621f-06d0-4ec9-919c-420a8ad89b01"
        alt="Welcome"
        style="width:100%; max-height:200px; object-fit:cover;"
      />

      <div style="padding:20px;">
        <h2 style="color:#F96D00;">Hi ${name} 👋</h2>

        <p>
          Thank you for reaching out to me via my portfolio website.
        </p>

        <p>
          I have received your message and will get back to you shortly.
        </p>

        <hr style="margin:20px 0;" />

        <p style="margin-bottom:5px;"><strong>📞 Phone:</strong> +91 6265118967</p>
        <p style="margin-bottom:5px;"><strong>📧 Email:</strong> mayankkdevops@gmail.com</p>

        <br/>

        <p style="margin-top:10px;">
          Regards,<br/>
          <strong>Mayank Sharma</strong><br/>
          DevOps & Cloud Engineer 
        </p>
      </div>
    </div>
  `
});


    console.log("✅ User auto-reply sent");

    res.json({ success: true });

  } catch (error) {
    console.error("❌ EMAIL ERROR FULL DETAILS ↓↓↓");
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message || "Email failed"
    });
  }
});

module.exports = router;

