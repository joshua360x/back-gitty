const GitHub = require('../models/Github');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');



module.exports = class UserService {
  static async createProfile(code) {
    const tokenNeeded = await exchangeCodeForToken(code);

    const obtainProfile = await getGithubProfile(tokenNeeded);

    let userThatHasProfile = await GitHub.findByGitHubUsername(obtainProfile.username);
    if (!userThatHasProfile) {
      userThatHasProfile = await GitHub.insertProfileStage(obtainProfile);
    }
    return userThatHasProfile;
  }
};





