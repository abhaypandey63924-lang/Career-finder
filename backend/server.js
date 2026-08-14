const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// 1. Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/careerDB')
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 2. Data Structure (Schema)
const careerSchema = new mongoose.Schema({
  title: String,
  category: String,
  skillsRequired: [String],
  avgSalary: String,
  description: String
});

const Career = mongoose.model('Career', careerSchema);

// 3. API Routes

// API 1: Get All Careers / Search
app.get('/api/careers', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    const careers = await Career.find(query);
    res.json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API 2: Seed Sample Data
app.post('/api/careers/seed', async (req, res) => {
  try {
    await Career.deleteMany({}); // Old data clear karein

    const sampleCareers = [
      {
        title: "Frontend Developer",
        category: "Tech",
        skillsRequired: ["HTML", "CSS", "JavaScript", "React"],
        avgSalary: "₹5 - 12 LPA",
        description: "Websites aur web apps ke user interfaces design aur code karna."
      },
      {
        title: "Backend Developer",
        category: "Tech",
        skillsRequired: ["Node.js", "Express", "MongoDB", "SQL"],
        avgSalary: "₹6 - 15 LPA",
        description: "Server logic, database integration aur APIs manage karna."
      },
      {
        title: "UI/UX Designer",
        category: "Design",
        skillsRequired: ["Figma", "Prototyping", "Wireframing"],
        avgSalary: "₹4 - 10 LPA",
        description: "Apps aur websites ke intuitive aur attractive user experience banana."
      },
      {
        title: "Data Analyst",
        category: "Business",
        skillsRequired: ["Python", "Excel", "SQL", "Tableau"],
        avgSalary: "₹5 - 11 LPA",
        description: "Business data ko analyze karke insights nikalna."
      }
    ];

    await Career.insertMany(sampleCareers);
    res.json({ message: "Sample Data Inserted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Server Listen
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});