const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    fullName: { type: String },
    // We will be encrypting the password before saving it to the database
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'roles',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
