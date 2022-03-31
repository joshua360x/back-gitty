-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE users (
  id GENERATED ALWAYS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT,
  avatar TEXT
);

CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS IDENTITY PRIMARY KEY,
  text_posts VARCHAR(255),
  username TEXT REFERENCES users(username)
);


