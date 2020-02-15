console.log('hold it now...');

$(document).ready(onReady);

function onReady(){
    console.log('hit it!');
    displayList();
}

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
            <button class="completeMe" data-completed="${response[i].completed}">C</button>
            ${response[i].name}
            <button class="deleteMe" data-id="${response[i].id}">D</button>
            </div>`)
        }
    }).catch(function(err){
        alert('Error getting Task List', err);
    })
}