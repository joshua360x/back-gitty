const { Router } = require('express');
const authentication = require('../middleware/authentication');
const Post = require('../models/Post');

module.exports = Router()
  .get('/', authentication, (req, res, next) => {
    // res.json({
    //   message: 'Congrats you made it',
    // });
    // const postsRecieved = await Post.getAllPosts();
    // res.json(postsRecieved);

    Post.getAllPosts().then((data) => {
      res.send(data);
    }).catch((err) => {
      next(err);
    });

  })

  .post('/', authentication, (req, res, next) => {
    // console.log('req,user :>> ', req.user);
    // console.log('req.body :>> ', req.body);
    // const postMade = await Post.makePost({
    //   ...req.body,
    //   username: req.user.id,
    // });
    Post.makePost({
      ...req.body,
      username: req.user.id,
    })
      .then((post) => res.send(post))
      // })
      .catch((err) => {
        next(err);
        // console.log('postMade :>> ', postMade);
        // res.json(postMade);
      });
  });
