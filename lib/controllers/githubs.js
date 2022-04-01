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

  .get('/login/callback', async (req, res, next) => {
    try {
      const { code } = req.query;

      const user = await UserService.createProfile(code);
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

      const signatureofJWT = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });

      res
        .cookie(process.env.COOKIE_NAME, signatureofJWT, {
          httpOnly: true,
          maxAge: One_DAY_MS,
        })
        .redirect('/');
    } catch (error) {
      next(error);
    }
  })

  .delete('/', async (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({
        success: true,
        message: 'You have been successfully logged out. Have a great day!',
      });
  });
