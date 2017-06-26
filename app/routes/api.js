const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const config = require('../../config');
const User = require('../models/user');
const postRoutes = require('./posts');
const tagRoutes = require('./tags');

router.use((req, res, next) => {

  const token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        throw err;
      } else {
        req.user = decoded;
        next();
      }
    })
  } else {
    const err = new Error('No token provided');
    err.status = 403;
    throw err;
  }
})

router.get('/', (req, res) => {
  res.json({'status': 'ok'});
})

router.get('/users', (req, res) => {
  User.find({}, function(err, users) {
    if (err) throw err;
    res.json(users);
  })
})

router.use('/posts', postRoutes);
router.use('/tags', tagRoutes);

module.exports = router;