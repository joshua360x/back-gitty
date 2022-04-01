const pool = require('../utils/pool');


module.exports = class Post{
  id;
  textPosts;
  username;

  constructor(row) {
    this.textPosts = row.text_posts;
    this.username = row.username;
  }


  static async makePost({ textPosts }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
      posts (text_posts)
      VALUES ($1)
      `, [textPosts]
    );
    return new Post(rows[0]);
  }


};



