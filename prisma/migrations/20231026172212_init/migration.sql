-- Create the User table
CREATE TABLE User (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Create the Goal table
CREATE TABLE Goal (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  type VARCHAR(255) NOT NULL,
  target NUMERIC(10, 2) NOT NULL,
  deadline TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES User(id)
);

-- Create the Workout table
CREATE TABLE Workout (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  type VARCHAR(255) NOT NULL,
  duration INT NOT NULL,
  intensity VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES User(id)
);

-- Create the Nutrition table
CREATE TABLE Nutrition (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  mealType VARCHAR(255) NOT NULL,
  calories INT NOT NULL,
  macros VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES User(id)
);

-- Create the Sleep table
CREATE TABLE Sleep (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  duration INT NOT NULL,
  quality VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES User(id)
);

-- Create the Post table
CREATE TABLE Post (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  content TEXT NOT NULL,
  createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES User(id)
);

-- Create the Progress table
CREATE TABLE Progress (
  id SERIAL PRIMARY KEY,
  goalId INT NOT NULL,
  value NUMERIC(10, 2) NOT NULL,
  createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (goalId) REFERENCES Goal(id)
);

-- Create the PostLikes table (Many-to-Many relationship between User and Post)
CREATE TABLE PostLikes (
  userId INT NOT NULL,
  postId INT NOT NULL,
  PRIMARY KEY (userId, postId),
  FOREIGN KEY (userId) REFERENCES User(id),
  FOREIGN KEY (postId) REFERENCES Post(id)
);

-- Create the Following table (Many-to-Many relationship between User and User for following)
CREATE TABLE Following (
  followerId INT NOT NULL,
  followingId INT NOT NULL,
  PRIMARY KEY (followerId, followingId),
  FOREIGN KEY (followerId) REFERENCES User(id),
  FOREIGN KEY (followingId) REFERENCES User(id)
);