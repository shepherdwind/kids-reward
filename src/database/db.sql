CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  -- email VARCHAR(255) UNIQUE NOT NULL,
  image VARCHAR(255),
  birthday DATE,
  score INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reward (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES "users"(id),
  score SMALLINT,
  reason VARCHAR(100),
  "date" DATE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
  users (name, image, birthday)
VALUES
  ('Elsa', '/elsa.jpg', '2018-01-06');

INSERT INTO
  users (name, image, birthday)
VALUES
  ('JioJio', '/jiojio.jpg', '2020-05-09');