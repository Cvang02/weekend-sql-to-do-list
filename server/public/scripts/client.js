// MAKING SURE CLIENT.JS IS RUNNING.
console.log(`(CLIENT.JS IS WORKING!!!)`);

$(document).ready(onReady);

function onReady() {
    setupClickListerners()
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
            $('input').val('');
        })
        .catch((error) => {
            console.log('POST unsuccessful',error)
        })
    } // END OF ADDTOTASKLISTS