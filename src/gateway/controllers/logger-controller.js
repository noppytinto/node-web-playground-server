
function logRequests(req, res, next) {
    console.log('\n\n');
    console.log('// --------------- LOGGING ----------------');
    console.log('time: ', new Date())
    console.log('request from:', req.hostname);
    console.log('to:', req.path);
    console.log('// ----------------------------------------');
    next();
}

module.exports = {
    logRequests,
}