var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
    pool.connect(function (conErr, client, done){
        if (conErr){
            console.log('line 7', conErr);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM tasklist;', function (queryErr, resultObj){
                done();
                if (queryErr){
                    console.log('line 13', queryErr);
                    res.sendStatus(500);
                } else {
                    res.send(resultObj.rows);
                }
            });
        }
    })
});

router.post('/', function (req, res) {
    var newTask= req.body;
    pool.connect(function (conErr, client, done){
        if (conErr){
            res.sendStatus(500);
        } else {
            var queryString= 'INSERT INTO tasklist (task) VALUES ($1)';
            var values= [newTask]
            client.query(queryString,[newTask.task], function(queryErr, resultObj) {
                done();
                if (queryErr) {
                    res.sendStatus(500)
                 } else {
                    res.sendStatus(201)
                 }
            });
        }
    })
});

router.delete('/:id', function(req,res){
    var dbId= req.params.id;

    pool.connect(function (conErr, client, done){
        if (conErr){
            res.sendStatus(500);
        } else {
            client.query('DELETE FROM tasklist WHERE id = $1;', [dbId], function(queryErr, result){
                done();
                if(queryErr){
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                }
            }) ;
        }
    }
)}); 

router.put('/:id', function(req,res){
    var dbId= req.params.id;
    
    pool.connect(function (conErr, client, done){
        if (conErr){
            res.sendStatus(500);
        } else {
            client.query('UPDATE tasklist SET taskcompleted=true WHERE id = $1;', [dbId], function(queryErr, result){
                done();
                if(queryErr){
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                }
            }) ;
        }
    }
)});

module.exports = router;