const jwtUtils = require('../shared-utils/jwt-utils');
const userDao = require('./dao/user-dao');
const User = require('./models/User');

function authorizeApp(req, res) {
    // req.session.appIsAuthorized = false;

    try {
        // extract app id from client
        const clientToken = jwtUtils.extractBearerToken(req);
        const tokenPayload = jwtUtils.decodeToken(clientToken);

        // check app id
        if (!tokenPayload || tokenPayload.appId !== (process.env.APP_ID))
            return res.status(401).json({error: 'app id is not valid'});

        // send now an access token back to the client
        console.log('APP AUTHORIZED');
        const token = jwtUtils.generateAccessToken({apiKey: process.env.API_KEY});
        // req.session.appIsAuthorized = true;
        return res.json({token: token});

    } catch (err) {
        console.log('APP NOT AUTHORIZED:',err);
        res.status(401).json({error: err});
    }
}

function restricted(req, res) {
    res.json({data: 'this is a restricted content'});

    // if (req.session.clientIsAuthorized) {
        
    // }
    // else {
    //     res.status(401).json({data: 'cannot access to restricted content'});
    // }
}

// TODO
function signUp(req, res) {
    const email = req.body.email;
    const password = req.body.password;


    // check email is valid
    if ( ! _emailIsValid(email)) 
        return res.status(404).json({error: 'invalid mail format'});

    // check password is valid
    if ( ! _passIsValid(password)) 
        return res.status(404).json({error: 'password must be at least 6 characters'});

    // check username is already used
    const tempUser = new User(email, password);
    if (userDao.userExists(tempUser));


    // check email is already used

    // register new user

}










function _emailIsValid(email) {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexEmail.test(String(email).toLowerCase());
}

function _passIsValid(pass) {
    const MIN_PASSWORD_LENGTH = 6;
    if (!pass) return false;
    if (pass.length < MIN_PASSWORD_LENGTH) return false;

    return true;
}

// function generateAccessToken(req) {
//     const payload = req.data;
//     return authService.generateAccessToken(payload);
// }

// function decodeToken(req) {
//     let data;
//     try {
//         const token = authService.extractBearerToken(req);
//         console.log('GIVEN TOKEN:', token);
//         data = authService.decodeToken(token);
//
//     } catch (err) {
//         console.log('CANNOT EXTRACT BEARER TOKEN: ', err);
//         data = {error: err};
//     }
//     return data;
// }


//
module.exports = {
    authorizeApp,
    restricted,
    signUp,
    _emailIsValid,
    _passIsValid,
}