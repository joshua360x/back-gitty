const { Router } = require('express');
// const fetch = require('cross-fetch');
const jwt = require('jsonwebtoken');
// const GitHub = require('../models/Github');
const UserService = require('../services/UserService');

const One_DAY_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })

  .get('/login/callback', (req, res, next) => {
    // try {
    // console.log('req :>> ', req);
    const { code } = req.query;

    // const user = await UserService.createProfile(code);
    UserService.createProfile(code)
      .then((data) => {
        // console.log('data :>> ', data);
        // jwt.sign({ ...data }, process.env.JWT_SECRET, {
        //   expiresIn: '1 day',
        // });
        const signatureofJWT = jwt.sign({ ...data }, process.env.JWT_SECRET, {
          expiresIn: '1 day',
        });

        res
          .cookie(process.env.COOKIE_NAME, signatureofJWT, {
            httpOnly: true,
            maxAge: One_DAY_MS,
          })
          .redirect('/api/v1/posts');
      })



      .catch((err) => {
        next(err);
      });
    // console.log('🚀 ~ file: githubs.js ~ line 21 ~ .get ~ user', user);
    // const getGithubProfile = await userWithAccessToken.json();
    // console.log(
    //   '🚀 ~ file: githubs.js ~ line 39 ~ .get ~ getGithubProfile',
    //   getGithubProfile
    // );

    // let userFoundFromAPICall = await GitHub.findByGitHubUsername(
    //   getGithubProfile.username
    // );

    // if (!userFoundFromAPICall) {
    //   userFoundFromAPICall = await GitHub.insertProfileStage(req.body);
    // }

    // const signatureofJWT = jwt.sign({ ...user }, process.env.JWT_SECRET, {
    //   expiresIn: '1 day',
    // });
    // console.log(
    //   '🚀 ~ file: githubs.js ~ line 39 ~ .get ~ signatureofJWT',
    //   signatureofJWT
    // );

    // res
    //   .cookie(process.env.COOKIE_NAME, signatureofJWT, {
    //     httpOnly: true,
    //     maxAge: One_DAY_MS,
    //   })
    //   .redirect('/api/v1/posts');
  })

  .delete('/', async (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME).json({
      success: true,
      message: 'You have been successfully logged out. Have a great day!',
    });
  });
