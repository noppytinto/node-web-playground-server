const raw = require('body-parser/lib/types/raw');
const databaseManager = require('../../database/database-manager');
const pool = databaseManager.getPool();
const User = require('../models/User');

async function getAllUsers(){
    let result = {};
    const query = 'SELECT * FROM "USER"';

    try {
        const res = await pool.query(query);
        const rows = res.rows;
        if (rows) {
            // rows.forEach(row => {
            //     console.log(row);
            // })

            result.result = rows.map(rawUser => {
                const user = buildUser(rawUser);
                return {
                    email: user.getEmail(), 
                    username: user.getUsername(),
                };
            });
        }

    } catch (err) {
        result = {error: err.toString()}
        console.error(err)
    } 

    console.log('QUERY RESULT', result);
    return result;
}

// (async function (){
//     console.log(getAllUsers());
// })();


// TODO
async function userExists(user){
    if (await _usernameExists(user.getUsername())) return true;
    if (await _emailExists(user.getEmail())) return true;

    return false;
}


async function _usernameExists(username){
    let result = false;
    const query = 'SELECT u.username FROM "USER" u WHERE u.username = $1';

    try {
        const res = await pool.query(query, [username]);
        const rows = res.rows;
        if (rows.length > 0) {
            result = true;
        }
    } catch (err) {
        console.error(err)
    } 

    console.log('QUERY RESULT', result);
    return result;
}

async function _emailExists(email){
    let result = false;
    const query = 'SELECT u.email FROM "USER" u WHERE u.email = $1';

    try {
        const res = await pool.query(query, [email]);
        const rows = res.rows;
        if (rows.length > 0) {
            result = true;
        }
    } catch (err) {
        console.error(err)
    } 

    console.log('QUERY RESULT', result);
    return result;
}

// (async function (){
//     console.log(emailIsTaken('bar@mail.com'));
// })();


function buildUser(jsonData) {
    const user = new User(
        jsonData.username, 
        jsonData.email, 
        jsonData.password
    );

    return user;
}




//
module.exports = {
    userExists,
}