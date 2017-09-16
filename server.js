var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = 5000;
var app = express();
var index = require('./routes/index');
var tasks = require('./routes/tasks');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/', index);
app.use('/tasks', tasks);

app.listen(port, function() {
    console.log('listening on port: ', port);
});
