const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    /* ===============================
       1️⃣ MAIL TO YOU (ADMIN)
    =============================== */
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

    /* ===============================
       2️⃣ AUTO-REPLY TO USER (HTML)
    =============================== */
    await transporter.sendMail({
      from: `"Mayank Sharma" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ Thanks for contacting me",
      html: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #eaeaea; border-radius:8px;">
          
          <div style="text-align:center;">
            <img 
              src="https://camo.githubusercontent.com/d687c10d9ada32f8569cce92c035c2e1ff0e8ee016086a2f6b34ca120a2f068a/68747470733a2f2f692e6962622e636f2f4b4e523462794a2f6d6179616e6b2d6769742e706e67"
              alt="Mayank Sharma Logo"
              style="height:80px; margin-bottom:20px;"
            />
          </div>

          <p style="font-size:16px;">Hi <strong>${name}</strong>,</p>

          <p style="font-size:15px; line-height:1.6;">
            Thanks for reaching out to me.<br/>
            I have received your message and will get back to you soon.
          </p>

          <p style="margin-top:30px; font-size:15px;">
            Best regards,<br/>
            <strong>Mayank Sharma</strong>
          </p>

          <hr style="margin:30px 0;" />

          <p style="font-size:12px; color:#888; text-align:center;">
            © ${new Date().getFullYear()} Mayank Sharma | Portfolio Contact
          </p>
        </div>
      `
    });

    res.json({ success: true });

  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
