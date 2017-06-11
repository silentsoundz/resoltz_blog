var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'production';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'azure-blog'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/azure-blog-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'azure-blog'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/azure-blog-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'azure-blog'
    },
    host: 'http://api-resoltz.azurewebsites.net',
  	user: 'apigene',
  	password: 'Resoltz21',
  	database: 'resoltz-blog',
  	port: process.env.PORT || 3000,
  	ssl: true,
    db: 'azure-blog-pg.postgres.database.azure.com'
  }
};

module.exports = config[env];
