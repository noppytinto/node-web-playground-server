const configManager = require('../utils/config-manager');

//
function initServer(server) {
    configManager.setExpressVariables(server);
}

//
module.exports = initServer;