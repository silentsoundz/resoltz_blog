DROP TABLE IF EXISTS member CASCADE;
CREATE TABLE member (
  id SERIAL PRIMARY KEY,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  pic_url VARCHAR(1000),
  password VARCHAR(255) NOT NULL,
  date_joined TIMESTAMP DEFAULT now());

DROP TABLE IF EXISTS post CASCADE;
CREATE TABLE post (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  member_id INTEGER references member(id) ON DELETE CASCADE,
  snippet VARCHAR(1000) NOT NULL,
  post_entry TEXT NOT NULL,
  image_url VARCHAR(1000),
  tags VARCHAR(255),
  status INTEGER,
  categories INTEGER,
  post_date TIMESTAMP DEFAULT now());


DROP TABLE IF EXISTS role;
CREATE TABLE role (
  member_id INTEGER references member(id) ON DELETE CASCADE,
  member_role VARCHAR(255) DEFAULT 'member',
  date_changed TIMESTAMP DEFAULT now());

DROP TABLE IF EXISTS comment;
CREATE TABLE comment (
  id SERIAL PRIMARY KEY,
  post_id INTEGER references post(id) ON DELETE CASCADE,
  member_id INTEGER references member(id) ON DELETE CASCADE,
  description VARCHAR(1000) NOT NULL,
  status INTEGER,
  date_posted TIMESTAMP DEFAULT now());

DROP TABLE IF EXISTS workout;
CREATE TABLE workout (
  id SERIAL PRIMARY KEY,
  member_id INTEGER references member(id) ON DELETE CASCADE,
  post_id INTEGER references post(id) ON DELETE CASCADE,
  description VARCHAR(1000) NOT NULL,
  weight INTEGER,
  calories INTEGER,
  pushups INTEGER,
  squats INTEGER,
  pullups_front_wide INTEGER,
  pullups_front_close INTEGER,
  pullups_reverse_wide INTEGER,
  pullups_reverse_close INTEGER,
  planks INTEGER,
  distance INTEGER,
  body_parts INTEGER,
  tags VARCHAR(255),
  workout_length INTEGER DEFAULT 0,
  workout_image_url VARCHAR(255) NOT NULL,
  date_posted TIMESTAMP DEFAULT now());

  CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
