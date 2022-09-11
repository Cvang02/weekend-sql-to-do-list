// MAKING SURE CLIENT.JS IS RUNNING.
console.log(`(CLIENT.JS IS WORKING!!!)`);

$(document).ready(onReady);

function onReady() {
    setupClickListerners()
    getTasks()
} // END OF ONREADY FUNCTION.

// ANYTHING THAT HAS CLICK WILL GO HERE. 
function setupClickListerners() {
    $('#addButton').on('click', addToTaskLists);
    $('#viewTasks').on('click', '.deleteButton', taskDelete );
    $('#viewTasks').on('click', '.completeStatus', taskUpdate);
    $('.dropOption').on( 'click', inputDropValue);
    $('#viewKoalas').on( 'click', '.dropOption', inputDropValue);
}

function inputDropValue() {
    console.log( $(this).parent().siblings('.dropbtn') );
    $(this).parent().siblings('.dropbtn').val( $(this).data('val') );
}

// POST ROUTE - ADD NEW TASKS LIST TO DATABASE.
function addToTaskLists () {
    let taskName = $('#tasksName').val();
    let taskDescription = $('#tasksDesciption').val();
    let taskPriority = $('#tasksPriority').val();
    let taskStatus = $('#tasksStatus').val();

    if (!taskName || !taskDescription || !taskPriority || !taskStatus) {
        alert('please enter information')
        return;
    }

    Swal.fire({
        icon: 'success',
        title: 'Tasks Added',
        text: `DON'T PROCRASTINATE!!!`,
    })

    $.ajax({
        method: 'POST',
        url: '/myAgendaLists',
        data: {taskName, taskDescription, taskPriority, taskStatus}
    }).then((response) => {
        console.log('POST successful', response);
        getTasks()
    })
    .catch((error) => {
        console.log('POST unsuccessful',error)
    })
} // END OF ADDTOTASKLISTS

// GET ROUTE - REQUEST DATA FROM SERVER DATABASE AND APPEND IT TO DOM.
function getTasks() {
        
    $.ajax({
        method: 'GET',
        url: '/myAgendaLists'
    })
    .then((response) => {
        let tasksList = response;
        console.log('GET successful', tasksList);
        
        renderTask (tasksList)

    }).catch((error) => {
          console.log('GET unsuccessful',error);
    });
} // END OF GETTASKS FUNCTION.

function renderTask (tasksList) {
    $('#viewTasks').empty();

    for (let newTasks of tasksList) {
        let statusPriority = (newTasks.priority === true) ? 'High' : 'Low';
        let statusStatus = (newTasks.status === true) ? 'Complete' : 'Not Complete'; 
    
    //  NEED TO FIND A WAY TO CHANGE BACKGROUND COLOR WHEN CLICKED ON COMPLETE BUTTON. 
    // if (statusStatus === 'Complete') {
    //     $('[data-id]').css('background-color', 'green');
    // } else {}
        
    $('#viewTasks').append(`
        <tr class="tRoll" data-id=${newTasks.id}>
            <td class="Tname">${newTasks.task}</td>
            <td class="Tdesciption">${newTasks.description}</td>
            <td class="level"><button class="levelPriority">${statusPriority}</button></td>
            <td class="complete"><button class="completeStatus">${statusStatus}</button></td>
            <td><button class="deleteButton">DELETE</button></td>
        </tr>`);}

    $('input').val('');
}

// DELETE ROUTE - DELETE DATA FROM DATABASE AND DOM. 
function taskDelete () {
    $.ajax({
        method: 'DELETE',
        url: `/myAgendaLists/${$(this).parent().parent().data('id')}`
        })
    .then((response) => {
        console.log('DELETE successful',response);

        Swal.fire({
            icon: 'success',
            title: 'Tasks Deleted',
        })

        getTasks();
        })
    .catch((error) => {
    console.log('DELETE unsuccessful',error);
    });
} //    END OF TASKDELETE FUNCTION. 

// PUT ROUTE - LET US EDIT TASK STATUSES. 
function taskUpdate() {
    $.ajax({
        method: 'PUT',
        url: `/myAgendaLists/${$(this).parent().parent().data('id')}`
    })
    .then((response) => {
        console.log('PUT successful',response);

        Swal.fire({
            title: '🥳 Task Finished 🎉',
            width: 600,
            padding: '3em',
            color: '#716add',
            backdrop: `
              rgba(0,0,123,0.4)
              url(../images/cat-space.gif)
              left top
              no-repeat
            `
          })

        getTasks();
     })
    .catch((error) => {
        console.log('PUT unsuccessful',error);
    });
} // END OF TASKUPDATE FUNCTION. 

