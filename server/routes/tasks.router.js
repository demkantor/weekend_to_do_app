const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

//routes
//get full list of tasks from database
router.get('/', (req,res)=>{
    console.log('in /tasks GET');
    const query = `SELECT * FROM "tasks";`;
    pool.query(query).then((results)=>{
        console.table(results.rows);
        res.send(results.rows);
    }).catch((err)=>{
        console.log('ERROR with /tasks GET', err);
        res.sendStatus(500);
    })
})//end GET tasks



//exports
module.exports = router;