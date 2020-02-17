//requires
const pg = require('pg');

const config = {
    user: 'postgres',
    password: '1728fox',
    database: 'weekend_to_do_app',
    host: 'localhost',
    port: 5432,
    max: 12,
    idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

pool.on('connect', ()=>{
    console.log('connected to postgres');
});

pool.on('error', (err)=>{
    console.log('error connecting to postgres', err);
});


//exports
module.exports = pool;