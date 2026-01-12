require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
