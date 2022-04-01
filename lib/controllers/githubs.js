const { Router, application } = require('express');
const fetch = require('cross-fetch');
const GitHub = require('../models/Github');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
    );
  })

  .get('/login/callback', async (req, res) => {

    const { code } = req.query;

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
  });
