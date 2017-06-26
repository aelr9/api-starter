var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var postRoutes = require('./posts');
var tagRoutes = require('./tags');

router.use(function(req, res, next) {

  var token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        throw err;
      } else {
        req.user = decoded;
        next();
      }
    })
  } else {
    var err = new Error('No token provided');
    err.status = 403;
    throw err;
  }
})

router.get('/', function(req, res) {
  res.json({'status': 'ok'});
})

router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    if (err) throw err;
    res.json(users);
  })
})

router.use('/posts', postRoutes);
router.use('/tags', tagRoutes);

module.exports = router;