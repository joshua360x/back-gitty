const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const agent = request.agent(app);

jest.mock('../lib/utils/github');

describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to the github oauth page upon login', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );
  });

  it('should login and redirect users to /api/v1/github/posts', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    // console.log('req :>> ', req.req.path);
    expect(req.req.path).toEqual('/api/v1/posts');
  });

  it('should sign the user out by deleting its cookie', async () => {
    const res = await agent.delete('/api/v1/github/');
    expect(res.body).toEqual({
      success: true,
      message: 'You have been successfully logged out. Have a great day!',
    });
  });


  it('should get all the posts that was cretaed in the setup sql', async () => {
    // const res = await request
    // .agent(app)
    // .get('/api/v1/github/login/callback?code=42');

    const userCreated = await UserService.createProfile(42);
    const req = await request(app).get('/api/v1/posts');
    expect(req.body).toEqual([{
      id: expect.any(String),
      textPosts: expect.any(String),
      username: 'joshua360x'
    }]);
  });



});
