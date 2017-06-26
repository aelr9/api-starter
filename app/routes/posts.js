var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var Tag = require('../models/tag');

// create
router.post('/', function(req, res) {
  if (!req.body.title || !req.body.content)
    throw new Error('Missing some fields');

  var tags = req.body.tags.split(',').map(t => t.trim());
  tags.map(tag => {
    Tag.create({ tag });
  })
  var newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    user: req.user.name,
    tags: tags
  })
  newPost.save(function(err) {
    if (err) throw err;
    res.json({message: 'Post created successfully'});
  })
})

// get all
router.get('/', function(req, res) {
  Post.find({ user: req.user.name }, function(err, posts) {
    if (err) throw err;
    res.json(posts);
  })
})

// get a post
router.get('/:id', function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) throw err;
    res.json(post);
  })
})

// edit a post
router.put('/:id', function(req, res) {
  Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, post) {
    if (err) throw err;
    res.json(post);
  })
})

// delete a post
router.delete('/:id', function(req, res) {
  Post.findByIdAndRemove(req.params.id, function(err) {
    if (err) throw err;
    res.json({message: 'Post removed'});
  })
})

module.exports = router;