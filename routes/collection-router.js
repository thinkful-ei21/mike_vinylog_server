'use strict';

const express = require('express');
const passport = require('passport');

const Collection = require('../models/collection-model');


const router = express.Router();

// Protect endpoints using JWT Strategy
router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const { title, thumb, genre, year } = req.body;
  const newAlbum = { title, thumb, genre, year };

  /***** Never trust users - validate input *****/
  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  Collection.create(newAlbum)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;