const jwtUtils = require('../shared-utils/jwt-utils');
const userDao = require('./dao/user-dao');
const UserBuilder = require('./models/UserBuilder');


function authorizeApp(req, res) {
    // _deleteUserSession(req);

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

async function login(req, res) {
    _deleteUserSession(req);

    const email = req.body.email;
    const password = req.body.password;

    // check email is valid
    if (!_emailIsValid(email))
        return res.status(404).json({error: 'invalid mail format'});

    // check email is already used
    if (!(await userDao.emailExists(email)))
        return res.status(404).json({error: 'email does not exist'});

    // check email+password is already used
    if (!(await userDao.emailAndPasswordMatches(email, password)))
        return res.status(404).json({error: 'invalid password'});

    req.session.userIsLogged = true;
    return res.json({message: 'login successful'});

}// login

function logout(req, res) {
    _deleteUserSession(req);

    return res.json({message: 'logout successful'});
}

async function signUp(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    // check email is valid
    if ( ! _emailIsValid(email))
        return res.status(404).json({error: 'invalid mail format'});

    // check password is valid
    if ( ! _passIsValid(password))
        return res.status(404).json({error: 'password must be at least 6 characters'});

    // check email is already used
    if (await userDao.emailExists(email))
        return res.status(404).json({error: 'email already taken'});

    // register new user
    const newUser = new UserBuilder(email)
        .setPassword(password)
        .build();
    if (await userDao.insertUser(newUser)) {
        return res.json({message: 'signup successful'});
    }
    else {
        return res.status(404).json({error: 'cannot register user'});
    }
}

async function deleteUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    // check email is already used
    if (!(await userDao.emailExists(email)))
        return res.status(404).json({error: 'email does not exist'});

    // check email+password is already used
    if (!(await userDao.emailAndPasswordMatches(email, password)))
        return res.status(404).json({error: 'invalid password'});

    // delete user
    const targetUser = new UserBuilder(email)
        .setPassword(password)
        .build();
    if (await userDao.deleteUser(targetUser)) {
        _deleteUserSession(req);
        return res.json({message: 'delete successful'});
    }
    else {
        return res.status(404).json({error: 'cannot delete user'});
    }
}


/////////////////////////////////
// UTILS
/////////////////////////////////
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


/////////////////////////////////
// MISC
/////////////////////////////////
function _deleteUserSession(req) {
    if (req.session.userIsLogged) {
        req.session.userIsLogged = false;
        req.session.destroy();
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

function loggedContent(req, res) {
    res.json({data: 'this is a restricted content for logged users'});
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

/////////////////////////////////
// EXPORT
/////////////////////////////////
module.exports = {
    authorizeApp,
    restricted,
    login,
    signUp,
    loggedContent,
    logout,
    deleteUser
}