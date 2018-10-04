'use strict';

const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const Wants = require('../models/wants-model');

const router = express.Router();

// Protect endpoints using JWT Strategy
router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

/* ========== GET/READ ALL ALBUMS ========== */
router.get('/', (req, res, next) => {
  const userId  = req.user._id;

  let filter = { userId };

  Wants.find(filter)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== GET/READ A SINGLE ALBUM ========== */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Wants.findOne( { _id: id, userId } )
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});


/* ========== POST/SAVE AN ALBUM ========== */
router.post('/', (req, res, next) => {
  const { title, thumb, genre, year, userId } = req.body;
  const newAlbum = { title, thumb, genre, year, userId };

  /***** Never trust users - validate input *****/
  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  Wants.create(newAlbum)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== DELETE/REMOVE A SINGLE ALBUM ========== */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Wants.findOneAndDelete({ _id: id})
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;