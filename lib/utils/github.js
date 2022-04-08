const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  // const makeRequestFromGitHubToGetToken = await fetch(
  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((requestForToken) => {
    // const exchangeCodeForTokenJSONFormat =
    //   await makeRequestFromGitHubToGetToken.json();
    let newaccessToken = requestForToken.json();
    const { access_token } = newaccessToken;
    return access_token;
  });
  // const { access_token } = exchangeCodeForTokenJSONFormat;
  // return access_token;
};
// console.log('  req.query.code :>> ', req.query.code);

// console.log(
//   'makeRequest FromGitHub ToGetToken :>> ',
//   makeRequestFromGitHubToGetToken
// );

const getGithubProfile = async (token) => {
  // const userWithAccessToken = await
  return fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  }).then((data) => {
    // const { login, avatar_url, email } = await userWithAccessToken.json();
    let userWithAccessToken = data.json();
    const { login, avatar_url, email } = userWithAccessToken;

    return { username: login, avatar: avatar_url, email };
  });
};

module.exports = {
  getGithubProfile,
  exchangeCodeForToken,
};
