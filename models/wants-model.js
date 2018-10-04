'use strict'

const mongoose = require('mongoose')

const wantsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumb: String,
  genre: String,
  year: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

wantsSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
})

module.exports = mongoose.model('Wants', wantsSchema)