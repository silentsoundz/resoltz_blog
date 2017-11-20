const path = require('path');

const rootPath = path.normalize(`${__dirname}/..`);
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'azure-blog',
    },
    port: process.env.PORT || 3000,
    db: `postgres://${process.env.USER}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  },

  test: {
    root: rootPath,
    app: {
      name: 'azure-blog',
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/azure-blog-test',
  },

  production: {
    root: rootPath,
    app: {
      name: 'azure-blog',
    },
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT || 3000,
    ssl: true,
    db: process.env.DB_SOURCE,
  },
};

module.exports = config[env];
