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

//add new task to database
router.post('/', (req,res)=>{
    console.log('in /tasks POST:', req.body);
    const query = `INSERT INTO "tasks" ("name") VALUES ($1);`;
    const values = [req.body.name];
    pool.query(query, values).then((results)=>{
        res.sendStatus(201);
    }).catch((err)=>{
        console.log('error with INSERT', err);
        res.sendStatus(500);
    })
})//end POST tasks

//toggle complete in database
router.put('/:id', (req,res)=>{
    console.log('in tasks PUT:', req.params.id, req.body.completed);
    const query = `UPDATE "tasks" SET "completed"=$1 WHERE id=$2;`;
    const values =[req.body.completed, req.params.id];
    pool.query(query, values).then((results)=>{
        console.table(results);
        res.sendStatus(200);
    }).catch((err)=>{
        console.log('error with UPDATE', err);
        res.sendStatus(500);
    })
})//end PUT tasks

//delete task row from database by id
router.delete('/:id', (req,res)=>{
    console.log('tasks DELETE table row:', req.params.id);
    const query = `DELETE FROM "tasks" WHERE id=$1;`;
    const values = [req.params.id];
    pool.query(query,values).then((response)=>{
        console.table(response);
        res.sendStatus(200);
    }).catch((err)=>{
        console.log('error with DELETE,', err);
        res.sendStatus(500);
    })
})//end tasks DELETE


//exports
module.exports = router;