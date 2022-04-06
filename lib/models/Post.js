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
    const { rows } = await pool.query(
      `
      INSERT INTO
      posts (text_posts, username_id)
      VALUES ($1, $2)
      RETURNING *
      `,
      [textPosts, username]
    );
    console.log('rows :>> ', rows);
    return new Post(rows[0]);
  }

  static async getAllPosts() {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      posts
      `
    );
    return rows.map((row) => new Post(row));
  }
};
