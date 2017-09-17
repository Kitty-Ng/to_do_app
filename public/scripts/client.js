$(document).ready(onReady);

function onReady(){
    getTasks();
    $('#addButton').on('click', addTask);
    $('#allTasks').on('click', ".deleteMe", deleteTask);
    $('#allTasks').on('click', ".completeMe", completeTask);
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
            $row.append('<td class="glyphicon glyphicon-ok"></td>');
            
            $('#completedTasks').append($row);
        } else if (res[i].taskcompleted === false){
            var $row = $('<tr data-taskcompleted="' + res[i].taskcompleted + '"></tr>');
            $row.append('<td>' + res[i].task + '</td>');

            var $completeButton =$('<td><input type ="checkbox" class="completeMe" data-id="' + res[i].id + '"></input></td>');
            $row.append($completeButton);

            var $deleteButton =$('<td><input type="checkbox" class="deleteMe" data-id="' + res[i].id + '"></input></td>');
            $row.append($deleteButton);

            $row.append('<td>' + res[i].created_at + '</td>');

            $('#allTasks').append($row);
        }
    }
}


function addTask(){
    if ($('#taskIn').val() === "") {
        alert("Please enter your new task!");
      } else {
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
}}

function deleteTask(){
    var thisId = $(this).data('id');

    if (confirm('Are you sure you want to remove this task?')){
    $.ajax({
        method: 'DELETE',
        url: '/tasks/' + thisId,
        success: function(){
            getTasks()
        }
    })}
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
            
    })
}

