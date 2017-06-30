const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const Tag = require('../models/tag');

// create
router.post('/', (req, res, next) => {
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
    if (err) next(err);
    res.json(newPost);
  })
})

// get all
router.get('/', (req, res, next) => {
  Post.find({ user: req.user.name }, (err, posts) => {
    if (err) next(err);
    res.json(posts);
  })
})

// get a post
router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) next(err);
    res.json(post);
  })
})

// edit a post
router.put('/:id', (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, post) => {
    if (err) next(err);
    res.json(post);
  })
})

// delete a post
router.delete('/:id', (req, res, next) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) next(err);
    res.json({message: 'Post removed', id: req.params.id});
  })
})

module.exports = router;