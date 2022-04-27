
function error404(req, res) {
    console.log('ERROR:', 'resource not found');
    res.status(404).json({error: '404 not found'});
}

module.exports = {
    error404,
}