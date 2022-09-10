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
}

// POST ROUTE - ADD NEW TASKS LIST TO DATABASE.
    function addToTaskLists () {
        let taskName = $('#tasksName').val();
        let taskDescription = $('#tasksDesciption').val();
        let taskPriority = $('#tasksPriority').val();
        let taskStatus = $('#tasksStatus').val();

        $.ajax({
            method: 'POST',
            url: '/myAgendaLists',
            data: {taskName, taskDescription, taskPriority, taskStatus}
        }).then((response) => {
            console.log('POST successful', response);
            getTasks()
            $('input').val('');
        })
        .catch((error) => {
            console.log('POST unsuccessful',error)
        })
    } // END OF ADDTOTASKLISTS

    // GET ROUTE - REQUEST DATA FROM SERVER DATABASE AND APPEND IT TO DOM.
    function getTasks() {
        console.log( 'in getTask' );
        
        $.ajax({
          method: 'GET',
          url: '/myAgendaLists'
        })
        .then((response) => {
            let tasksList = response;
            console.log('GET successful', tasksList);
            $('#viewTasks').empty();
            
            for (let newTasks of tasksList) {
                let statusPriority = (newTasks.priority === true) ? 'High' : 'Low';
                let statusStatus = (newTasks.status === true) ? 'Complete' : 'Not Complete';
                $('#viewTasks').append(`
                <tr data-id=${newTasks.id}>
                    <td class="Tname">${newTasks.task}</td>
                    <td class="Tdesciption">${newTasks.description}</td>
                    <td class="level"><button class="levelPriority">${statusPriority}</button></td>
                    <td class="complete"><button class="CompleteStatus">${statusStatus}</button></td>
                    <td><button class="delete">DELETE</button></td>
                    <td class="editTd"><button class="edit">EDIT</button></td>
                </tr>
                `);
            }
        })
        .catch((error) => {
          console.log('GET unsuccessful',error);
        });
      } // END OF GETTASKS FUNCTION. 