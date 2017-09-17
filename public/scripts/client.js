$(document).ready(onReady);

function onReady(){
    getTasks();
    $('#addButton').on('click', addTask);
    $('#allTasks').on('click', ".deleteMe", deleteTask)
    $('#allTasks').on('click', ".completeMe", completeTask)
}

function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/tasks',
        success: function(data){
            $('#allTasks').empty();
            $('#completedTasks').empty();
            appendRows(data);
            }
    })
}

function appendRows(res){
    for(var i = 0; i < res.length; i++){
        if (res[i].taskcompleted === true){
            var $row = $('<tr data-taskcompleted="' + res[i].taskcompleted + '"></tr>');
            $row.append('<td>' + res[i].task + '</td>');
            $('#completedTasks').append($row);
        } else if (res[i].taskcompleted === false){
            var $row = $('<tr data-taskcompleted="' + res[i].taskcompleted + '"></tr>');
            $row.append('<td>' + res[i].task + '</td>');

            var $completeButton =$('<td><button class="completeMe" data-id="' + res[i].id + '">Complete</button></td>');
            $row.append($completeButton);

            var $deleteButton =$('<td><button class="deleteMe" data-id="' + res[i].id + '">Delete</button></td>');
            $row.append($deleteButton);

            $('#allTasks').append($row);
        } else {
            console.log('error with client js appendRows')
        }
    }
}


function addTask(){
    var newTask ={
        task: $('#taskIn').val(),
    }

    $('#taskIn').val(''),

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask,
        success: function(res){
            getTasks();
        }
    })
}

function deleteTask(){
    var thisId = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        url: '/tasks/' + thisId,
        success: function(){
            getTasks()
        }
    })
}

function completeTask(){
    var thisId = $(this).data('id');
    var thisTaskCompleted = $(this).data('taskcompleted');
    var updateTask ={
        id: thisId,
        taskcompleted: thisTaskCompleted
    }

    $.ajax({
        method: 'PUT',
        url: '/tasks/' + thisId,
        data: updateTask,
        success: function(){
            getTasks();
            }
            
        }
    )
}

