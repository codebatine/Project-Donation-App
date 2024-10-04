const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
