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
    // console.log('req,user :>> ', req.user);
    // console.log('req.body :>> ', req.body);
    const postMade = await Post.makePost({
      ...req.body,
      username: req.user.id,
    });
    // console.log('postMade :>> ', postMade);
    res.json(postMade);
  });
