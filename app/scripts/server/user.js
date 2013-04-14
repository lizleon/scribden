exports.getScribdenUserByUsername = function(req, res) { 
    var dbConnect = require('./sql-util.js');
    var result = new Array();
    var conn = dbConnect.getSQLConnection(); // called from utils.js; connect to the db
    
    conn.then(function(response) {
        var statement = conn.createStatement('BEGIN EXEC SPGetScribdenUserByUsername @usernameParam END', {
            usernameParam: { type: 'VarChar', size: 255 }
        });
        statement.on('error', function(err) {
            // error handler here
            console.log(err);
            conn.end();
            res.json({
                result: undefined,
                error: err
            });
        })
        .on('row', function(row) {
            console.log('user found!');
            result.push(row);
        })
        .on('done', function(data) {
            conn.end();
            res.json({
                result: result,
                error: undefined
            });
        });
        statement.execute({ usernameParam : req.params.username });
    });
    
};

exports.insertScribdenUser = function(req, res) {
    var dbConnect = require('./sql-util.js');
    console.log('inserting...');
    console.log('deferring...');
    var connPromise = dbConnect.getSQLConnection(); // called from utils.js
    console.log('connecting...');
    connPromise.then(function(conn) {
        console.log('connected!');
        console.log(req.body.username);
        console.log(req.body.password);
        var statement = conn.createStatement('BEGIN EXEC SPInsertScribdenUser @usernameParam, @passwordParam END', {
            usernameParam: { type: 'VarChar', size: 255 },
            passwordParam: { type: 'VarChar', size: 255 }
        });
        statement.on('row', function(response) {
            console.log('row insterted!');
        });
        statement.on('error', function(err) {
            // error handler here
            console.log('insert failed...');
            console.log(err);
            conn.end();
            res.json({
                result: false,
                error: err
            });
        });
        statement.on('done', function(response) {
            if(response.isError) {
                console.log('statement completed, insert failed...');
                res.json({
                    result: false,
                    error: 'statement completed, insert failed'
                });
            }
            else {
                console.log('inserted!');
                res.json({
                    result: true,
                    error: undefined
                });
            }
            conn.end();
        });
        console.log('executing stored proc...');
        statement.execute({ usernameParam : req.body.username,
                            passwordParam : req.body.password
                          });
    }, function(reason) {
        // error handler here
        console.log(reason);
    });
    
};