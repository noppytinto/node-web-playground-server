const jwt = require('jsonwebtoken');


function generateAccessToken(payload) {
    return jwt.sign(
        {...payload}, // pack as objet...
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: `${process.env.JWT_TOKEN_DURATION}` }, // ...in order for the expiration to work
    );
}

function extractBearerToken(req) {
    let token = undefined;

    try {
        if (!req) throw new Error('invalid req object');

        const authHeader = req.headers['authorization'];
        token = authHeader && authHeader.split(' ')[1];
    } catch (err) {
        console.error('CANNOT EXTRACT TOKEN:', err);
    }

    return token;
}

function decodeToken(token) {
    let decoded = undefined;

    try {
        if (!token) throw new Error('token undefined');

        decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        return decoded;
    } catch (err) {
        console.error('CANNOT DECODE TOKEN:', err);
    }

    return decoded;
}

// function generateLongLastingAccessToken(payload) {
//     return jwt.sign(
//         {appId: process.env.APP_ID}, // pack as objet...
//         process.env.JWT_ACCESS_SECRET,
//         { expiresIn: '1y' }, // ...in order for the expiration to work
//     );
// }


//
module.exports = {
    generateAccessToken,
    extractBearerToken,
    decodeToken,
}