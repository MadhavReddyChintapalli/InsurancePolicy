const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

// Connect Database
connectDB();

//Enable cors
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/policies', require('./routes/policies'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
