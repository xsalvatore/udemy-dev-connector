// modules importation
const express = require('express');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// imports our models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// holds the express router
const router = express.Router();

// @route           post api/posts
// @description     creates a post
// @access          private
router.post('/', [auth, [check('text', 'Text is required').not().isEmpty()]], async (req, res) => {
  // holds the errors
  const errors = validationResult(req);

  // if we have some errors, returns a 400 status with the custom error messages defined previously
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // holds the user adding a new post without the password
    const user = await User.findById(req.user.id).select('-password');

    // holds the new post
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    // saves the new post to the database
    const post = await newPost.save();

    // returns the new post
    res.json(post);
  } catch (err) {
    // logs the message from the error object
    console.error(err.message);

    // returns a 500 status with a custom error message
    res.status(500).send('server error');
  }
});

// @route           get api/posts
// @description     gets all the posts
// @access          private
router.get('/', auth, async (req, res) => {
  try {
    // holds the posts
    const posts = await Post.find().sort({ date: -1 });

    // returns the posts
    res.json(posts);
  } catch (err) {
    // logs the message from the error object
    console.error(err.message);

    // returns a 500 status with a custom error message
    res.status(500).send('server error');
  }
});

// @route           get api/posts/:id
// @description     gets a post by id
// @access          private
router.get('/:id', auth, async (req, res) => {
  try {
    // holds the post matching a specific id
    const post = await Post.findById(req.params.id).sort({ date: -1 });

    // if there is no post, returns a 404 status with a custom error message
    if (!posts) {
      return res.status(404).json({ msg: 'no posts found' });
    }

    // returns the post
    res.json(posts);
  } catch (err) {
    // logs the message from the error object
    console.error(err.message);

    // returns a 500 status with a custom error message
    res.status(500).send('server error');
  }
});

// @route           delete api/posts
// @description     delete a specific post using it's id
// @access          private
router.delete('/:id', auth, async (req, res) => {
  try {
    // holds the post about to be deleted
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'post not found' });
    }

    console.log(post);

    // checks on the user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorized' });
    }

    await post.remove();

    // returns the posts
    res.json({ msg: 'post removed' });
  } catch (err) {
    // logs the message from the error object
    console.error(err.message);

    // if we have an error of kind object id, returns a 404 error with a custom message
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'post not found' });
    }

    // returns a 500 status with a custom error message
    res.status(500).send('server error');
  }
});

// @route           put api/posts/like/:id
// @description     likes a post
// @access          private
router.put('/like/:id', auth, async (req, res) => {
  try {
    // holds the post about to be liked by the user
    const post = await Post.findById(req.params.id);

    // checks if the post has been liked already by the current logged in user
    if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'post already liked' });
    }

    // adds a new like to the post
    post.likes.unshift({ user: req.user.id });

    // saves the post with the new like
    await post.save();

    // returns the likes
    res.json(post.likes);
  } catch (err) {
    // logs the message from the error object
    console.error(err.message);

    // returns a 500 status with a custom error message
    res.status(500).send('server error');
  }
});

// @route           put api/posts/unlike/:id
// @description     unlikes a post
// @access          private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    // holds the post we want to modify
    const post = await Post.findById(req.params.id);

    // checks if the post has already been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      // returns a 400 status with a custom error message
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // removes the like
    post.likes = post.likes.filter(({ user }) => user.toString() !== req.user.id);

    // saves the post to the database
    await post.save();

    // returns the likes from the post
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route           post api/posts/comments/:id
// @description     comments on a post
// @access          private
router.post('/comment/:id', [auth, [check('text', 'Text is required').not().isEmpty()]], async (req, res) => {
  // holds the errors
  const errors = validationResult(req);

  // if we have some errors, returns a 400 status with the custom error messages defined previously
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // holds the user adding a new post without the password
    const user = await User.findById(req.user.id).select('-password');

    // holds the post we want to comment on
    const post = await Post.findById(req.params.id);

    // holds the new comment
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    // adds the new comment on the post
    post.comments.unshift(newComment);

    // saves the post with the new comment
    await post.save();

    // returns the post with the new comment
    res.json(post.comments);
  } catch (err) {
    // logs the message from the error object
    console.error(err.message);

    // returns a 500 status with a custom error message
    res.status(500).send('server error');
  }
});

// @route           delete api/posts/comments/:id/:comment_id
// @description     deletes a comment on a post
// @access          private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    // holds the post we want to delete a comment on
    const post = await Post.findById(req.params.id);

    // pulls out the comment we want to remove
    const comment = post.comments.find((comment) => comment.id === req.params.comment_id);

    // checks if the comment exist
    if (!comment) {
      return res.status(404).json({ msg: 'comment does not exist' });
    }

    // checks if the logged in user is the one who made the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorized' });
    }

    // gets the index of the comment we need to remove
    const removeIndex = post.comments.map((comment) => comment.user.toString()).indexOf(req.user.id);

    // removes the comment from the array
    post.comments.splice(removeIndex, 1);

    // saves the post without the removed comment
    await post.save();

    // returns the post's comments
    res.send(post.comments);
  } catch (err) {
    // logs the message from the error object
    console.error(err.message);

    // returns a 500 status with a custom error message
    res.status(500).send('server error');
  }
});

// exports each routes from the router
module.exports = router;
