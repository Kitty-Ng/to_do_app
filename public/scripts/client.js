$(document).ready(onReady);

function onReady(){
    getTasks();
    $('#addButton').on('click', addTask);
    $('body').on('click', ".deleteMe", deleteTask);
    $('body').on('click', ".completeMe", completeTask);

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
        var $task = res[i].task;
        var $id = res[i].id;
        var $taskcompleted = res[i].taskcompleted
        var $row = $('<tr data-taskcompleted="' + $taskcompleted + '"></tr>');
        var $deleteButton = $('<td><input type="checkbox" class="deleteMe" data-id="' + $id + '"></input></td>');

        if ($taskcompleted === true){
            $row.append('<td>' + $task + '</td>');
            $row.append('<td class="glyphicon glyphicon-ok"></td>');
            $row.append($deleteButton);

            var completed_date = (res[i].completed_at).slice(0,10);
            $row.append('<td>' + completed_date + '</td>');
            
            $('#completedTasks').append($row);
        } else if ($taskcompleted === false){
            $row.append('<td>' + $task + '</td>');

            var $completeButton =$('<td><input type ="checkbox" class="completeMe" data-id="' + $id + '"></input></td>');
            $row.append($completeButton);
            $row.append($deleteButton);
            
            var created_date = (res[i].created_at).slice(0,10);
            $row.append('<td>' + created_date + '</td>');

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

    if (confirm('Are you sure you want to remove this task? \nThis will remove it permanently from our database.')){
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
