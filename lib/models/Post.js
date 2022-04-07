const pool = require('../utils/pool');

module.exports = class Post {
  id;
  textPosts;
  username;

  constructor(row) {
    this.id = row.id;
    this.textPosts = row.text_posts;
    this.username = row.username_id;
  }

  static async makePost({ textPosts, username }) {
    // const { rows } = await pool.query(
    return pool
      .query(
        `
      INSERT INTO
      posts (text_posts, username_id)
      VALUES ($1, $2)
      RETURNING *
      `,
        [textPosts, username]
      )
      .then((data) => {
        return new Post(data.rows[0]);
      });
    // console.log('rows :>> ', rows);
  }

  static async getAllPosts() {
    // const { rows } = await pool.query(
    return pool
      .query(
        `
      SELECT
      *
      FROM
      posts
      `
      )
      .then((data) => {
        return data.rows.map((row) => new Post(row));
      });
  }
};
