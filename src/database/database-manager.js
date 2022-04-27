const configService = require('../auth/utils/config-manager');
const poolOptions = configService.getDatabaseOptions();
const { Pool } = require('pg')
const pool = new Pool(poolOptions);


function checkConnection() {
    pool.query('SELECT NOW()', (err, res) => {
        if (err) {
            console.log('DATABASE CONNECTION FAILED:', err.toString());
            return pool.end();
        }

        console.log('DATABASE CONNECTION SUCCESSFUL:', res.rows);
    })
}

async function tryQuery(query) {
    let result = {};

    try {
        const res = await pool.query(query);
        const rows = res.rows;
        if (rows) {
            // rows.forEach(row => {
            //     console.log(row);
            // })

            result = {result: rows};
        }

        // console.log('query executed');
    } catch (err) {
        result = {error: err.toString()}
        console.log(err)
    } 
    // finally {
    //     pool.end()
    // }

    return result;
}

function getPool() {
    return pool;
}

async function disconnect() {
    console.log('calling end')
    await pool.end()
    console.log('pool has drained')
}

module.exports = {
    tryQuery,
    checkConnection,
    getPool,
};