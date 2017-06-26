var express = require('express');
var router = express.Router();
var User = require('../models/user');

var jwt = require('jsonwebtoken');
var config = require('../../config');
var bcrypt = require('bcrypt');

router.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      var err = new Error('User not found')
      err.status = 401;
      throw err;
    } else {
      console.log(user);
      console.log(req.body);
      bcrypt.compare(req.body.password, user.password, function(err, cmp) {
        if (err) {
          throw err;
        } else if (!cmp) {
          var err = new Error('Authentication failed. Wrong password')
          err.status = 401;
          throw err;
        } else {
          var token = jwt.sign({name: user.name}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          })

          res.json({ token: token });  
        }
      })
    }
  })
})

router.post('/register', function(req, res) {
  bcrypt.hash(req.body.password, config.saltRounds, function(err, hash) {
    if (err) throw err;
    console.log(hash);
    User.create({
      name: req.body.name,
      password: hash,
      admin: req.body.admin
    }, function(err) {
      if (err) throw err;
      res.json({ message: 'User registered successfully' })
    })
  })
})

module.exports = router;