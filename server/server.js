const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const taskRouter = require('./routes/task_router');
app.use('/tasks', taskRouter);

const PORT = process.envPORT || 5000;

app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('Listening on ', PORT);
});


