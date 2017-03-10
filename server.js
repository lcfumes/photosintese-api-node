'use strict';

const Hapi = require('hapi');

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

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
server.connection({ port: 3000, routes: { cors: true }});

const options = {
  info: {
    'title': 'Photosintese API Documentation',
    'version': Pack.version,
  }
};

server.auth.scheme('custom', AuthService.tokenAuthorization);
server.auth.strategy('token', 'custom');

server.route(Routes);

if (env === 'dev') {
  server.register([
    Inert,
    Vision,
    {
      'register': HapiSwagger,
      'options': options
  }], (err) => {
    server.start( (err) => {
     if (err) {
        throw err
      }
      console.log(`Server running at: ${server.info.uri}`);
    });
  })
} else {
  server.start( (err) => {
   if (err) {
      throw err
    }
    console.log(`Server running at: ${server.info.uri}`);
  });
}