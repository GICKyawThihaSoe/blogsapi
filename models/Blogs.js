const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Date, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Added authorId
});

module.exports = mongoose.model('Blogs', blogSchema);
