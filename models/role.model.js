const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  level: { type: Number, required: true, unique: true },
});

module.exports = mongoose.model('roles', roleSchema);