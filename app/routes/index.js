var express = require('express');
var router = express.Router();
var apiRoutes = require('./api');
var auth = require('./auth');

var port = process.env.PORT || 8080;

router.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
})

router.use('/', auth);
router.use('/api', apiRoutes);

// var User = require('../models/user');
// router.get('/setup', function(req, res) {

//   // create a sample user
//   var nick = new User({ 
//     name: 'admin',
//     password: 'password',
//     admin: true 
//   });

//   // save the sample user
//   nick.save(function(err) {
//     if (err) throw err;

//     console.log('User saved successfully');
//     res.json({ success: true });
//   });
// });

module.exports = router;