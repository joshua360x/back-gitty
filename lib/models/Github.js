const pool = require('../utils/pool');

module.exports = class GitHub {
  id;
  username;
  email;
  avatar;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
    this.avatar = row.avatar;
  }

  static async insertProfileStage({ username, email, avatar }) {
    // if (!username) throw new Error('Username is required');

    // const { rows } = await pool.query(
    return pool
      .query(
        `
      INSERT INTO
        users (username, email, avatar)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
        [username, email, avatar]
      )
      .then((data) => {
        console.log('data :>> ', data);
        //  new GitHub(rows[0]);
        // data.rows[0];
        console.log('data.rows :>> ', data.rows);
        return new GitHub(data.rows[0]);
      });
  }

  static async findByGitHubUsername(nameGivenToUser) {
    // const { rows } = await pool.query(
    return pool
      .query(
        `
      SELECT
      *
      FROM users
      WHERE username=$1
      `,
        [nameGivenToUser]
      )
      .then((data) => {
        if (!data.rows[0]) return null;
        return new GitHub(data.rows[0]);
      });
    // console.log('rows :>> ', rows);
  }

  static async findByGitHubPostByUsername(nameGivenToUser) {
    const { rows } = await pool.query(
      //might need a group By potentially
      `
      SELECT
      users.username,
      posts.text_posts
      FROM
      users
      INNER JOIN
      posts
      ON users.username = posts.username
      WHERE username=$1
      `,
      [nameGivenToUser]
    );
    return new GitHub(rows[0]);
  }
};
