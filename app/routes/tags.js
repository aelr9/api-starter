var express = require('express');
var router = express.Router();
var Tag = require('../models/tag');

// get all
router.get('/', function(req, res) {
  Tag.find({}, {_id: 0, tag: 1}, function(err, tags) {
    if (err) throw err;
    res.json(tags.map(t => t.tag));
  })
})

module.exports = router;