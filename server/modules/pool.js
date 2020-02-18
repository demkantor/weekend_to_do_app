//requires
const pg = require('pg');
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
    // Heroku gives a url, not a connection object
    // https://github.com/brianc/node-pg-pool
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // heroku requires ssl to be true
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
} else {
    config = {
        host: 'localhost',
        port: 5432,
        max: 12,
        database: 'weekend_to_do_app', ////this line will change depending on database
        idleTimeoutMillis: 30000
    };
}


// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(config);

// the pool will log when it connects to the database
pool.on('connect', ()=>{
    console.log('connected to postgres');
});

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err)=>{
    console.log('error connecting to postgres', err);
});


//exports
module.exports = pool;