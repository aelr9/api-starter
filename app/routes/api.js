const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const async = require('async');

const config = require('../../config');
const User = require('../models/user');
const Post = require('../models/post');
const Tag = require('../models/tag');
const postRoutes = require('./posts');
const tagRoutes = require('./tags');

router.use((req, res, next) => {
  const token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        next(err);
      } else {
        req.user = decoded;
        next();
      }
    })
  } else if (req.method !== 'OPTIONS') {
    const err = new Error('No token provided');
    err.status = 403;
    next(err);
  } else {
    next();
  }
})

router.get('/users', (req, res, next) => {
  User.find({}, function(err, users) {
    if (err) next(err);
    res.json(users);
  })
})

router.get('/counts', (req, res, next) => {
  async.parallel([
    cb => {
      User.count({}, (err, count) => {
        cb(err, count);
      });
    },
    cb => {
      Post.count({}, (err, count) => {
        cb(err, count);
      });
    },
    cb => {
      Tag.count({}, (err, count) => {
        cb(err, count);
      });
    },
  ], (err, results) => {
    if (err) next(err);
    res.json({
      posts: results[1],
      users: results[0],
      tags: results[2]
    })
  })
})

router.use('/posts', postRoutes);
router.use('/tags', tagRoutes);

module.exports = router;