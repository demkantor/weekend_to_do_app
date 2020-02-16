console.log('hold it now...');

$(document).ready(onReady);

function onReady(){
    console.log('hit it!');
    displayList();
    getDate();
    $('.taskList').on('click', '.deleteMeButton', deleteMe);
    $('.taskList').on('click', '.completeMeButton', completeSwap);
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

function completeMe(id,completedSwap){
    $.ajax({
        type: 'PUT',
        url: `/tasks/${id}`,
        data: {completed: completedSwap}
    }).then(function(response){
        console.log('back from PUT:', response);
        displayList();
    }).catch(function(err){
        alert('error updating completed task!', err);
    })
}//end CompleteMe

function completeSwap(){
    let selectedId = $(this).parent().data('id');
    let selectedCompleted = $(this).data('completed');
    console.log('in completeMe with id:', selectedId, selectedCompleted);
    if(selectedCompleted === 'N'){
        let completedSwap ='Y' 
        completeMe(selectedId, completedSwap);
    }else{
        let completedSwap = 'N'
        completeMe(selectedId, completedSwap);
    }
}//end completeSwap

function deleteMe(){
    let selectedId = $(this).data('id');
    console.log('in deleteMe with id:', selectedId);
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: 'DELETE',
                url: `/tasks/${selectedId}`
            }).then(function(response){
                console.log(response);
                displayList();
                swal("Poof! Your task has been removed!", {
                    icon: "success",
                  });
            }).catch(function(err){
                alert('error with DELETE:', err);
            })
        } else {
          swal("Your task will stay!");
        }
      });
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
            if(response[i].completed === 'N'){
                el.append(`<div class="box tasks" data-id="${response[i].id}">
                <button class="completeMeButton" data-completed="${response[i].completed}"></button>
                ${response[i].name}
                <button class="deleteMeButton" data-id="${response[i].id}"></button>
                </div>`);
            }else
            if(response[i].completed === 'Y'){
                el.append(`<div class="box completedTasks" data-id="${response[i].id}">
                <button class="completeMeButton" data-completed="${response[i].completed}"></button>   
                   ${response[i].name}
                <button class="deleteMeButton" data-id="${response[i].id}"></button>
                </div>`);
            }
        }
    }).catch(function(err){
        alert('Error getting Task List', err);
    })
}//end displayList

function getDate(){
    var d = new Date();
    var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
    console.log(strDate);
    let el = $('.displayDate');
    el.empty();
    el.append(`<h1>${strDate}</h1>`);
}//end getDate