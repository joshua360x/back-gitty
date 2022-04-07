const GitHub = require('../models/Github');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class UserService {
  static async createProfile(code) {
    // const tokenNeeded = await exchangeCodeForToken(code);
    let profile;
    return exchangeCodeForToken(code)
      .then((token) => {
        console.log('should get some form of code', token);
        return getGithubProfile(token);
        // return data;
      })
      .then((profileFromGitHub) => {
        console.log('profile :>> ', profile);
        profile = profileFromGitHub;
        return GitHub.findByGitHubUsername(profileFromGitHub.username);
      })
      .then((user) => {
        if (!user) {
          return GitHub.insertProfileStage(profile);
        } else {
          return user;
        }
        // console.log('tokenNeeded :>> ', data.tokenNeeded);
        // let userThatHasProfile = GitHub.findByGitHubUsername(
        //   data.data.username
        // );
        // if (!userThatHasProfile) {
        //   GitHub.insertProfileStage(data.tokenNeeded);
        // }
        // return userThatHasProfile;
      });

    // const obtainProfile = await getGithubProfile(tokenNeeded);
    // console.log(
    //   '🚀 ~ file: UserService.js ~ line 11 ~ UserService ~ createProfile ~ obtainProfile',
    //   obtainProfile
    // );
    // const { login, avatar_url, email } = obtainProfile;

    // let userThatHasProfile = await GitHub.findByGitHubUsername(
    //   obtainProfile.username
    // );

    // if(!userThatHasProfile) return null;
    // console.log(
    //   '🚀 ~ file: UserService.js ~ line 19 ~ UserService ~ createProfile ~ userThatHasProfile',
    //   userThatHasProfile
    // );
    //   if (!userThatHasProfile) {
    //     userThatHasProfile = await GitHub.insertProfileStage(obtainProfile);
    //   }
    //   // console.log('object userThatHasProfile :>> ', userThatHasProfile);
    //   return userThatHasProfile;
  }
};
