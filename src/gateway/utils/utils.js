const crypto = require('crypto');

function getRandomSecret() {
    return crypto.randomBytes(64).toString('hex');
}


module.exports = {
    getRandomSecret,
}