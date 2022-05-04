const databaseManager = require('../../database/database-manager');
const pool = databaseManager.getPool();
const User = require('../models/User');


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
        console.error('_usernameExists() ERROR:', err)
    } 

    console.log('_usernameExists() RESULT', result);
    return result;
}

async function emailExists(email){
    let result = false;
    const query = 'SELECT u.email FROM "USER" u WHERE u.email = $1';

    try {
        const res = await pool.query(query, [email]);
        const rows = res.rows;
        if (rows.length > 0) {
            result = true;
        }
    } catch (err) {
        console.error('emailExists() ERROR:', err)
    } 

    console.log('emailExists() RESULT:', result);
    return result;
}

async function emailAndPasswordMatches(email, password) {
    let result = false;
    const query =
        'SELECT u.email FROM "USER" u WHERE u.email = $1 AND u.password = $2';

    try {
        const res = await pool.query(query, [email, password]);
        const rows = res.rows;
        if (rows.length > 0) {
            result = true;
        }
    } catch (err) {
        console.error('emailAndPasswordMatches() ERROR:', err)
    }

    console.log('emailAndPasswordMatches() RESULT:', result);
    return result;
}

async function insertUser(user){
    const email = user.getEmail();
    const pass = user.getPassword();

    let result = false;
    const query = 'INSERT INTO "USER"(email, password) VALUES($1, $2)';

    try {
        const res = await pool.query(query, [email, pass]);
        console.log('RESULT: ', res);
        const rowCount = res.rowCount;
        if (rowCount > 0) {
            result = true;
        }
    } catch (err) {
        console.error('insertUser() ERROR:', err)
    }

    console.log('insertUser() RESULT:', result);
    return result;
}

// TODO: deleteUser()
async function deleteUser(user){
    const email = user.getEmail();
    const pass = user.getPassword();

    let result = false;
    const query = 'DELETE FROM "USER" WHERE email=$1 AND password=$2';

    try {
        const res = await pool.query(query, [email, pass]);
        console.log('RESULT: ', res);
        const rowCount = res.rowCount;
        if (rowCount > 0) {
            result = true;
        }
    } catch (err) {
        console.error('deleteUser() ERROR:', err)
    }

    console.log('deleteUser() RESULT:', result);
    return result;
}

async function userExists(user){
    console.log('USER:', user);
    if (await _usernameExists(user.getUsername())) return true;
    if (await emailExists(user.getEmail())) return true;

    return false;
}


/////////////////////////////////
// UTILS
/////////////////////////////////

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


/////////////////////////////////
// EXPORTS
/////////////////////////////////
module.exports = {
    emailExists,
    emailAndPasswordMatches,
    insertUser,
    deleteUser,
}