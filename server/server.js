//requires
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//globals

//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

//server up!
const port = 5000
app.listen(port, ()=>{
    console.log('server up on:', port);
})

//routes
const tasksRouter = require('./routes/tasks.router.js');
app.use('/tasks', tasksRouter);
