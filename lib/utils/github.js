const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const makeRequestFromGitHubToGetToken = await fetch(
    'https://github.com/login/oauth/access_token',
    {
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
    }
  );
  const exchangeCodeForTokenJSONFormat =
    await makeRequestFromGitHubToGetToken.json();
  const { access_token } = exchangeCodeForTokenJSONFormat;
  return access_token;
};
// console.log('  req.query.code :>> ', req.query.code);

// console.log(
//   'makeRequest FromGitHub ToGetToken :>> ',
//   makeRequestFromGitHubToGetToken
// );

const getGithubProfile = async (token) => {
  const userWithAccessToken = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const { login, avatar_url, email } = await userWithAccessToken.json();

  return { username: login, avatar: avatar_url, email };
};



module.exports = {
  getGithubProfile,
  exchangeCodeForToken
};
