let express = require('express');
const pool = require('../modules/pool.js')
let router = express.Router();

router.use(express.urlencoded({ extended: true }));

// localhost:5000/tasks
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todo" ORDER BY "complete", "title";'
    pool.query(queryText)
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        });
});

// localhost:5000/tasks/add
router.post('/add', (req, res) => {
    const newTask = req.body;
    console.log(newTask);
    let queryText = `INSERT INTO "todo" ("title", "description") 
    VALUES ($1, $2);
    `

    pool.query(queryText, [newTask.title, newTask.description])
        .then((result) => {
            console.log(`added task- ${result.rows}`);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error making a task ${queryText}`, err);
            res.sendStatus(500);
        });
});

// localhost:5000/tasks/status-update/3
router.put('/status-update/:id', (req, res) => {
    let taskId = req.params.id;

    let queryText = `UPDATE "todo" SET "complete" = NOT "complete"
    WHERE "id" = $1;`
    pool.query(queryText, [taskId])
        .then((result) => {
            console.log(`changed task status for- ${taskId}`);
            res.send(`changed task status for- ${taskId}`);
        })
        .catch((err) => {
            console.log(`error changing task status for- ${taskId}`);
            res.sendStatus(500);
        });
});

// localhost:5000/tasks/delete/3
router.delete('/delete/:id', (req, res) => {
    let taskId = req.params.id;

    let queryText = `DELETE FROM "todo" WHERE "id" = $1;`;

    pool.query(queryText, [taskId])
        .then((result) => {
            console.log('db message ', result);
            console.log(`deleted task - ${taskId}`);
            res.send(`deleted task - ${taskId}`);
        })
        .catch((err) => {
            console.log(`error deleting- ${taskId}`);
            res.sendStatus(500);
        });
});

module.exports = router;