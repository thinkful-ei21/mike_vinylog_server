'use strict';

const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumb: String,
  genre: String,
  year: String
});


collectionSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

module.exports = mongoose.model('Collection', collectionSchema);