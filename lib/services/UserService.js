const GitHub = require('../models/Github');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = class UserService {
  static async createProfile(code) {
    const tokenNeeded = await exchangeCodeForToken(code);

    const obtainProfile = await getGithubProfile(tokenNeeded);
    // console.log(
    //   '🚀 ~ file: UserService.js ~ line 11 ~ UserService ~ createProfile ~ obtainProfile',
    //   obtainProfile
    // );
    // const { login, avatar_url, email } = obtainProfile;

    let userThatHasProfile = await GitHub.findByGitHubUsername(
      obtainProfile.username
    );
    // if(!userThatHasProfile) return null;
    // console.log(
    //   '🚀 ~ file: UserService.js ~ line 19 ~ UserService ~ createProfile ~ userThatHasProfile',
    //   userThatHasProfile
    // );
    if (!userThatHasProfile) {
      userThatHasProfile = await GitHub.insertProfileStage(obtainProfile);
    }
    // console.log('object userThatHasProfile :>> ', userThatHasProfile);
    return userThatHasProfile;
  }
};
