import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());

app.use(cors({
  origin: "*"
}));

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

let adzunaCache = {};


app.get("/", (req, res) => {
  res.send("Jobs API is running 🚀");
});

// routes - GET jobs sorted by newest first
app.get("/api/jobs", async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});

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

    // ✅ DEBUG: Log what fields Adzuna returns
    if (data.results && data.results.length > 0) {
      console.log("🔍 Adzuna job fields:", Object.keys(data.results[0]));
      console.log("📝 Description field:", data.results[0].description?.substring(0, 100));
      console.log("📝 __description__ field:", data.results[0].__description__?.substring(0, 100));
    }

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

setInterval(() => {
  fetch("https://your-backend.onrender.com");
}, 1000 * 60 * 5);


const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);