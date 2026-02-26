const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "https://diary-app-4gnw.vercel.app"
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.error("Error", err));

app.get('/', (req, res) => {
  res.send("Welcome to the Diary App Backend");
});

const authRoutes = require('../routes/auth');
const entryRoutes = require('../routes/entries');

app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);

module.exports = app;   // ✅ IMPORTANT