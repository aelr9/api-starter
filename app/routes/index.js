const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');
const auth = require('./auth');

router.get('/', (req, res) => {
    res.send('API Server Started. No CORS support');
})

router.use('/api', auth);
router.use('/api', apiRoutes);

// const User = require('../models/user');
// router.get('/setup', function(req, res) {

//   // create a sample user
//   const nick = new User({ 
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