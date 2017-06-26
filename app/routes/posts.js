const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const Tag = require('../models/tag');

// create
router.post('/', (req, res) => {
  if (!req.body.title || !req.body.content)
    throw new Error('Missing some fields');

  const tags = req.body.tags.split(',').map(t => t.trim());
  tags.map(tag => {
    Tag.create({ tag });
  })
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    user: req.user.name,
    tags: tags
  })
  newPost.save((err) => {
    if (err) throw err;
    res.json({message: 'Post created successfully'});
  })
})

// get all
router.get('/', (req, res) => {
  Post.find({ user: req.user.name }, (err, posts) => {
    if (err) throw err;
    res.json(posts);
  })
})

// get a post
router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) throw err;
    res.json(post);
  })
})

// edit a post
router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, post) => {
    if (err) throw err;
    res.json(post);
  })
})

// delete a post
router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) throw err;
    res.json({message: 'Post removed'});
  })
})

module.exports = router;