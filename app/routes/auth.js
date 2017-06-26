const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../../config');
const User = require('../models/user');

router.post('/authenticate', (req, res) => {
  User.findOne({
    name: req.body.name
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      const err = new Error('User not found')
      err.status = 401;
      throw err;
    } else {
      bcrypt.compare(req.body.password, user.password, (err, cmp) => {
        if (err) {
          throw err;
        } else if (!cmp) {
          const err = new Error('Authentication failed. Wrong password')
          err.status = 401;
          throw err;
        } else {
          const token = jwt.sign({name: user.name}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          })

          res.json({ token: token });
        }
      })
    }
  })
})

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, config.saltRounds, (err, hash) => {
    if (err) throw err;
    User.create({
      name: req.body.name,
      password: hash,
      admin: req.body.admin
    }, (err) => {
      if (err) throw err;
      res.json({ message: 'User registered successfully' })
    })
  })
})

module.exports = router;