'use strict';

const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumb: String,
  genre: String,
  year: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

wishlistSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);