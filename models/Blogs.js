const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Date, required: true },
});

module.exports = mongoose.model('Blogs', eventSchema);
