const utils = require('../utils/utils');


function hello(req, res) {
    res.json({message: 'hello world'});
}

function secret(req, res) {
    const data = utils.getRandomSecret();
    res.json({message: data});
}


module.exports = {
    hello,
    secret,
}