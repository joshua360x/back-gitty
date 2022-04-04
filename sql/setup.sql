-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT,
  avatar TEXT
);

CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  text_posts VARCHAR(255),
  username_id BIGINT REFERENCES users(id)
);





-- INSERT INTO users(username, email, avatar)
-- VALUES
-- ('firstPost', 'op', 'avatar');

-- INSERT INTO posts(text_posts, username_id)
-- VALUES
-- ('first post', 1);

