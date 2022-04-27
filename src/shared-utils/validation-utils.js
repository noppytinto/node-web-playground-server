const jwtUtils = require('./jwt-utils');



function authorizeRequest(req, res, next) {
    // req.session.userIsAuthorized = false;

    // if (! req.session.appIsAuthorized) {
    //     console.log('REQUEST NOT AUTHORIZED: app not authorized!');
    //     return res.status(401).send({error: 'app not authorized!'});
    // }

    try {
        const token = jwtUtils.extractBearerToken(req);
        const data = jwtUtils.decodeToken(token);

        if (!data || data.apiKey !== process.env.API_KEY)
            throw new Error('invalid api key');

        console.log('REQUEST AUTHORIZED');

        next();
    } catch (err) {
        console.log('REQUEST NOT AUTHORIZED: user not authorized');
        res.status(401).send({error: err.message});
    }
}


module.exports = {
    authorizeRequest,
}