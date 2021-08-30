$(ready);

function ready() {
    getTasks();
    $('#add-task').on('click', addTask);

    $('#task-table').on('click', '.complete-btn', toggleComplete);
    $('#task-table').on('click', '.delete-btn', deleteTask);
}

function getTasks() {
    // ajax get
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) => {
        displayTasks(response);
    }).catch((err) => {
        console.log('error', err)
    });   
}

function displayTasks(taskList) {
    // append each task out ofthe list 
    let taskTable = $('#task-table');
    taskTable.empty();

    for (let task of taskList) { // aappending tasks
        let taskButtonText = '';
        let classname = '';
        let buttonclass = '';
        if (task.complete) {
            taskButtonText = 'Task Not Complete';
            classname = 'nes-text is-success';
            buttonclass = 'complete-btn nes-btn is-warning';
        } else {
            taskButtonText = 'Complete';
            classname = 'nes-text is-warning';
            buttonclass = 'complete-btn nes-btn is-success';
        }
        let tableRow = `
        <tr class = "${classname}"> 
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.date.split('T')[0]}</td>
            <td>${!task.complete ? 'Incomplete' : 'Complete!'}</td>
            <td><button class= "${buttonclass}" data-id = "${task.id}">${taskButtonText}</button></td>
            <td><button class= "delete-btn nes-btn is-error" data-id = "${task.id}">DELETE</button></td>
        </tr>
        `
        taskTable.append(tableRow);
    }
}

function addTask() {
    // ajax post
    let title = $('#title-in').val();
    let description = $('#description-in').val();
    
    $.ajax({
        method: 'POST',
        url: '/tasks/add',
        data: {
            title: title,
            description: description
        }
    }).then((response) => {
        console.log(response);
        getTasks();
        $('#title-in').val('');
        $('#description-in').val('');

        }).catch((err) => {
        console.log(err);
    })
}

function toggleComplete(event) {
    // ajax put
    let taskId = $(event.target).data().id; 

    $.ajax({
        method: 'PUT',
        url: `/tasks/status-update/${taskId}`
    }).then((response) => {
        getTasks();
        console.log(`task status updated: ${taskId}`)
    }).catch((err) => {
        console.log(`we had an error changing task status for - ${taskId}`)
    });
}

function deleteTask(event) {
    // ajax delete
    let taskId = $(event.target).data().id; 
    $.ajax({
        method: 'DELETE',
        url: `/tasks/delete/${taskId}`
    }).then((response) => {
        getTasks();
        console.log(`task deleted: ${taskId}`)
    }).catch((err) => {
        console.log(`we had an error in deleting ${taskId} - ${err}`)
    });
}