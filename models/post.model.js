const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    vote: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'categories' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('posts', postSchema);
