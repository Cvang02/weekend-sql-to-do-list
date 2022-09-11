const express = require('express');
const priorityRouter = express.Router();

// DATABASE CONNECTION
const pool = require('../modules/pool.js');

// PUT ROUTE 
priorityRouter.put('/:id', (req, res) => {
    console.log(`Updating task, id ${req.params.id}`);
    let updateId = req.params.id;

    const queryTextwo = `
        UPDATE "agenda"
            SET "priority" = NOT "priority"
            WHERE "id" = $1;
    `
    pool.query(queryTextwo, [updateId])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('Error updating task', error);
            res.sendStatus(500);
        });
});

module.exports = priorityRouter; 