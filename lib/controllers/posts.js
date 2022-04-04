const { Router } = require('express');
const authentication = require('../middleware/authentication');
const Post = require('../models/Post');

module.exports = Router()
  .get('/', authentication, async (req, res) => {
    // res.json({
    //   message: 'Congrats you made it',
    // });
    const postsRecieved = await Post.getAllPosts();
    res.json(postsRecieved);
  })

  .post('/', authentication, async (req, res) => {
    const postMade = await Post.makePost(req.body);
    res.json(postMade);
  });
