const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRoutes = require('./routes/blogs'); 
const authRoutes = require('./routes/auth'); 

const app = express();

app.use(cors()); 
require('dotenv').config();

const mongodbUrl = process.env.NODE_ENV === 'development'
  ? process.env.MONGODB_DEV_URL
  : process.env.MONGODB_LOCAL_URL;
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());


app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
