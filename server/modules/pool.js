// set up the Pool
const pg = require('pg');
const Pool = pg.Pool;
// const pool = new Pool({
//     database: process.env.DATABASE_NAME || 'weekend_to_do_app', // the name of database, This can change!
//     host: 'localhost', // where is your database?
//     port: 5432, // the port for your database, 5432 is default for postgres
//     max: 10, // how many connections (queries) at one time
//     idleTimeoutMillis: 30000 // 30 second to try to connect, otherwise cancel query
// });

let config = {};
if (process.env.DATABASE_URL) {
    config = {
        // We use the DATABASE_URL from Heroku to connect to our DB
        connectionString: process.env.DATABASE_URL,
        // Heroku also requires this special `ssl` config
        ssl: { rejectUnauthorized: false },
    };
} else {
    // If we're not on heroku, configure PG to use our local database
    config = {
        database: 'weekend_to_do_app', // CHANGE THIS LINE to match your local database name!
        host: 'localhost',
        port: 5432,
        max: 10, // how many connections (queries) at one time
        idleTimeoutMillis: 30000 // 30 second to try to connect, otherwise cancel query
    };
}

const pool = new Pool(config);


pool.on('connect', () => {
    console.log('Postgresql connected');
});

pool.on('error', (error) => {
    console.log('Error with postgres pool', error);
});


module.exports = pool;