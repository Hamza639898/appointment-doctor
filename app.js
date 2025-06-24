const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Specialization routes
const specializationRoutes = require('./routes/specializationRoutes');
app.use('/api/specializations', specializationRoutes);

// Default test route
app.get('/', (req, res) => {
  res.send('Doctor Appointment API is running!');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
