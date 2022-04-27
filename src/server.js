'use strict';

const dotenv = require('dotenv');
dotenv.config();
const initServer = require('./gateway/utils/init-server');
const configManager = require('./gateway/utils/config-manager');
const port = configManager.getPort();
const express = require('express');
const server = express();

// import routes
const basicMiddlewares = require('./gateway/utils/basic-middlewares');
const loggerRoutes = require('./gateway/routes/logger-routes');
const authService = require('./auth/index');
const pageGeneratorService = require('./page-generator/index');
const testRoutes = require('./gateway/routes/test-routes');
const errorRoutes = require('./gateway/routes/error-routes');

// config server
initServer(server);
server.use(basicMiddlewares);



//////////////////////////////////////
// ROUTES
//////////////////////////////////////
server.use('*', loggerRoutes);

server.use('/auth', authService);

server.use('/page', pageGeneratorService);

server.use('/test', testRoutes);

server.use('*', errorRoutes);


//////////////////////////////////////
// start server
//////////////////////////////////////
server.listen(port, () => {
    console.log('server started on port:', port);
    console.log('mode:', process.env.NODE_ENV);
}).on('error', (err) => {
    console.error('CANNOT START SERVER:', err);
});