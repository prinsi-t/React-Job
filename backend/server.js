import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connect mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// schema with all fields including applyLink
const JobSchema = new mongoose.Schema({
  title: String,
  type: String,
  contractType: String,
  category: String,
  location: String,
  description: String,
  salary: String,
  applyLink: String,
  userEmail: String,
  posted: String,
  company: {
    name: String,
    description: String,
    contactEmail: String,
    contactPhone: String,
  },
}, {
  timestamps: true
});

const Job = mongoose.model("Job", JobSchema);

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  resetOTP: String,
  resetOTPExpiry: Date,
}, {
  timestamps: true
});

const User = mongoose.model("User", UserSchema);

let adzunaCache = {};

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

app.get("/", (req, res) => {
  res.send("Jobs API is running 🚀");
});

// routes - GET jobs sorted by newest first
app.get("/api/jobs", async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

// ===== AUTHENTICATION ROUTES =====

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

// ===== FORGOT PASSWORD ROUTES (NO EMAIL NEEDED FOR TESTING) =====

// Step 1: Request OTP
app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save OTP and expiry (10 minutes)
    user.resetOTP = otp;
    user.resetOTPExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    if (!resend || !process.env.RESEND_FROM) {
      return res.status(500).json({ message: "Email service not configured" });
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: [email],
      subject: "Password Reset OTP - ReactJobs",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
            <h2 style="color: #2563eb;">Password Reset Request</h2>
            <p>Hello,</p>
            <p>You requested to reset your password. Use the OTP below to proceed:</p>
            <div style="background-color: #eff6ff; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
              <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 5px; margin: 0;">${otp}</h1>
            </div>
            <p><strong>This OTP will expire in 10 minutes.</strong></p>
            <p>If you didn't request this, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #6b7280; font-size: 12px;">ReactJobs.com - Your Job Portal</p>
          </div>
        </div>
      `,
    });

    res.json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (err) {
    const details = err?.response?.data?.message || err?.message || "Failed to send OTP";
    console.error("Forgot password error:", details);
    res.status(500).json({ message: details });
  }
});

// Step 2: Verify OTP
app.post("/api/auth/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP matches and hasn't expired
    if (user.resetOTP !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    if (new Date() > user.resetOTPExpiry) {
      return res.status(401).json({ message: "OTP has expired" });
    }

    res.json({ 
      success: true, 
      message: "OTP verified successfully" 
    });
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({ message: "Verification failed" });
  }
});

// Step 3: Reset Password
app.post("/api/auth/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify OTP again
    if (user.resetOTP !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    if (new Date() > user.resetOTPExpiry) {
      return res.status(401).json({ message: "OTP has expired" });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);
    
    // Update password and clear OTP
    user.passwordHash = passwordHash;
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    res.json({ 
      success: true, 
      message: "Password reset successfully" 
    });
  } catch (err) {
    console.error("Password reset error:", err);
    res.status(500).json({ message: "Password reset failed" });
  }
});

// ===== JOB ROUTES =====

app.post("/api/jobs", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

app.put("/api/jobs/:id", async (req, res) => {
  res.json(await Job.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

app.delete("/api/jobs/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(400).json({ message: "Delete failed" });
  }
});

// ===== ADZUNA ROUTES =====

app.get("/api/live-jobs", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const country = req.query.country || "in";
    const city = req.query.city || "";
    const state = req.query.state || "";
    const cacheKey = `${country}-${page}`;

    if (adzunaCache[cacheKey]) {
      return res.json(adzunaCache[cacheKey]);
    }

    const locationQuery = [city, state].filter(Boolean).join(" ");

    const { data } = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}`,
      {
        params: {
          app_id: process.env.ADZUNA_APP_ID,
          app_key: process.env.ADZUNA_APP_KEY,
          results_per_page: 10,
          what: "react developer",
          where: locationQuery,
        },
      }
    );

    adzunaCache[cacheKey] = data.results;
    res.json(data.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Adzuna fetch failed" });
  }
});

app.get("/api/live-jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = await axios.get(
      "https://api.adzuna.com/v1/api/jobs/in/search/1",
      {
        params: {
          app_id: process.env.ADZUNA_APP_ID,
          app_key: process.env.ADZUNA_APP_KEY,
          results_per_page: 50,
          what: "developer",
        },
      }
    );

    const job = data.results.find(j => String(j.id) === String(id));

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      id: job.id,
      title: job.title,
      type: job.contract_time || "Full-Time",
      location: job.location?.display_name || "Remote",
      description: job.description,
      salary:
        job.salary_min && job.salary_max
          ? `${job.salary_min} - ${job.salary_max}`
          : "Not disclosed",
      company: {
        name: job.company?.display_name || "Unknown",
        description: job.description,
        contactEmail: "N/A",
        contactPhone: "N/A",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load Adzuna job" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
