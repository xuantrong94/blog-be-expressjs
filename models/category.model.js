const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('categories', categorySchema);
