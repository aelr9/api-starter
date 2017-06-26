const express = require('express');
const router = express.Router();

const Tag = require('../models/tag');

// get all
router.get('/', (req, res) => {
  Tag.find({}, {_id: 0, tag: 1}, (err, tags) => {
    if (err) throw err;
    res.json(tags.map(t => t.tag));
  })
})

module.exports = router;