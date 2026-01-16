import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connect mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// schema
const JobSchema = new mongoose.Schema({
  title: String,
  type: String,
  location: String,
  description: String,
  salary: String,
  company: {
    name: String,
    description: String,
    contactEmail: String,
    contactPhone: String,
  },
});

const Job = mongoose.model("Job", JobSchema);

// routes
app.get("/api/jobs", async (req, res) => {
  res.json(await Job.find());
});

app.post("/api/jobs", async (req, res) => {
  res.json(await Job.create(req.body));
});

app.get("/api/jobs/:id", async (req, res) => {
  res.json(await Job.findById(req.params.id));
});

app.put("/api/jobs/:id", async (req, res) => {
  res.json(await Job.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

app.delete("/api/jobs/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.get("/api/live-jobs", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const country = req.query.country || "in";
    const city = req.query.city || "";
    const state = req.query.state || "";

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

    res.json(data.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Adzuna fetch failed" });
  }
});



app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
