import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // REQUIRED
app.use(express.urlencoded({ extended: true })); // REQUIRED

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/send-email", async (req, res) => {
  console.log("Received:", req.body);  // <<< CHECK THIS

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "cc8772488@gmail.com",
      subject: `New Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Email send failed" });
  }
});

app.listen(5000, () => console.log("Server running on 5000"));
