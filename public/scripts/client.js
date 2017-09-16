$(document).ready(onReady);

function onReady(){
    getTasks();
    $('#addButton').on('click', addTask);
    $('#allTasks').on('click', ".deleteMe", deleteTask)
    // $('#allTasks').on('click', ".completeMe", completeTask)
}

function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/tasks',
        success: function(data){
            $('#allTasks').empty();
            appendRows(data);
            }
    })
}

function appendRows(res){
    for(var i = 0; i < res.length; i++){
        var $row = $('<tr></tr>');
            $row.append('<td>' + res[i].task + '</td>');

            var $deleteButton =$('<td><button class="deleteMe" data-id="' + res[i].id + '">Delete</button></td>');
            $row.append($deleteButton);

            var $completeButton =$('<td><button class="completeMe" data-id="' + res[i].id + '">Complete</button></td>');
            $row.append($completeButton);
            $('#allTasks').append($row);
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

// function completeTask(){
//     var thisId = $(this).data('id');

//     $.ajax({
//         method: 'PUT',
//         url: '/tasks/' + thisId,
//         success: function(){
//             getTasks()
//         }
//     })
//     }