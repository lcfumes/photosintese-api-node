'use strict';

const Hapi = require('hapi');

const Routes = require('./config/routes');

const env = process.env.NODE_ENV;
if (env == undefined) {
    console.log("NODE_ENV not defined");
    process.exit();
}

global.Config = require('./config/config.' + env + '.json');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route(Routes);

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});