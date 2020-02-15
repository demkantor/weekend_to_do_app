console.log('hold it now...');

$(document).ready(onReady);

function onReady(){
    console.log('hit it!');
    displayList();
    $('.taskList').on('click', '.deleteMeButton', deleteMe);
    $('.taskList').on('click', '.completeMeButton', completeMe);
    $('.addTaskButton').on('click', addTask);
}

function addTask(){
    let newTask = $('.addTask').text();
    let objectToSend = {
        name: newTask
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: objectToSend
    }).then(function(response){
        console.log(response);
        $('.addTask').text("Add New Task");
        displayList();
    }).catch(function(er){
        alert('error adding new task', err);
    })

}//end addTask

function completeMe(){
    let selectedId = $(this).parent().data('id');
    let completed = $(this).data('completed');
    console.log('in completeMe with id:', selectedId, completed);
}//end CompleteMe

function deleteMe(){
    let selectedId = $(this).data('id');
    console.log('in deleteMe with id:', selectedId);
}//end deleteMe

function displayList(){
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response){
        console.log(response);
        let el = $('.taskList');
        el.empty();
        for(let i=0; i<response.length; i++){
            el.append(`<div class="box tasks" data-id="${response[i].id}">
            <button class="completeMeButton" data-completed="${response[i].completed}">C</button>
            ${response[i].name}
            <button class="deleteMeButton" data-id="${response[i].id}">D</button>
            </div>`)
        }
    }).catch(function(err){
        alert('Error getting Task List', err);
    })
}//end displayList