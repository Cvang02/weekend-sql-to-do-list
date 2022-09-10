const express = require('express');
const todoRouter = express.Router();

// DATABASE CONNECTION
const pool = require('../modules/pool.js');

// POST ROUTE 
todoRouter.post('/', (req, res) => {
    let newtasks = req.body;
    let priority = (req.body.taskPriority === 'High') ? true : false;
    let status = (req.body.taskStatus === 'Y') ? true : false;

    console.log(`Add new Task`, newtasks);

    let queryText = `INSERT INTO "agenda" ("task", "description", "priority", "status")
                   VALUES ($1, $2, $3, $4);`;

    pool.query(queryText, [newtasks.taskName, newtasks.taskDescription, priority, status])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error adding new task', error);
            res.sendStatus(500);
        });
});

// GET ROUTE 

// DELETE ROUTE 

// PUT ROUTE 

module.exports = todoRouter; 