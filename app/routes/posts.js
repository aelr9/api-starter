const express = require('express');
const router = express.Router();
const async = require('async');

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
    if (err) {
      next(err);
    } else if (req.user.name === post.user) {
      const err = new Error('You are not allowed to see this post');
      err.status = 403;
      next(err);
    } else {
      res.json(post);
    }
  })
})

// edit a post
router.put('/:id', (req, res, next) => {
  if (req.body.tags) {
    const tags = req.body.tags.split(',').map(t => t.trim());
    tags.map(tag => {
      Tag.create({ tag });
    })
    req.body.tags = tags;
  }

  async.waterfall([
    (cb) => {
      Post.findById(req.params.id, (err, post) => {
        if (err) {
          cb(err, null);
        } else if (post.user !== req.user.name) {
          err = new Error('You are not allowed to edit this post');
          err.status = 403;
          cb(err, null);
        } else {
          cb(null, post);
        }
      })
    },
    (post, cb) => {
      Object.assign(post, req.body);
      post.save((err) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, post);
        }
      });

    }
  ], (err, post) => {
    if (err) {
      next(err);
    } else {
      res.json(post);
    }
  });
})

// delete a post
router.delete('/:id', (req, res, next) => {
  async.waterfall([
    (cb) => {
      Post.findById(req.params.id, (err, post) => {
        if (err) {
          cb(err, null);
        } else if (post.user !== req.user.name) {
          err = new Error('You are not allowed to delete this post');
          err.status = 403;
          cb(err, null);
        } else {
          cb(null, post);
        }
      })
    },
    (post, cb) => {
      post.remove((err) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, post);
        }
      });
    }
  ], (err, post) => {
    if (err) {
      next(err);
    } else {
      res.json(post);
    }
  });
})

module.exports = router;