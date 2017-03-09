'use strict';

const Hapi = require('hapi');

const env = process.env.NODE_ENV;
if (env == undefined) {
  console.log("NODE_ENV not defined");
  process.exit();
}

global.Config = require('./config/config.' + env + '.json');

global.database = require('mongoose');
database.connect(Config.database.connection);

const Routes = require('./config/routes');

const AuthService = require('./services/AuthService');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.auth.scheme('custom', AuthService.tokenAuthorization);
server.auth.strategy('token', 'custom');

server.route(Routes);

server.start((err) => {
  if (err) {
      throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});