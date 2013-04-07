// re-organize structure so that the server can call the db, as well as the client
angular.module('ScribdenApp', ['ngResource']).
    factory('User', function () {
        
        var userResource = {
            getUserByUsername : function(username, fn) {
                console.log('calling db...');
                var result;
                var conn = getSQLConnection(); // called from utils.js
                
                conn.on('connect', function() {
                    var statement = conn.createStatement('BEGIN EXEC SPGetUserByUsername @usernameParam END', {
                        usernameParam: { type: 'VarChar', size: 255 }
                    });
                    statement.on('error', function(err) {
                        if(err) {
                            // error handler here
                            console.log(err);
                            fn(err);
                        }
                    });
                    statement.on('row', function(row) {
                        console.log('user found!');
                        fn(null, row);
                        result = row;
                    });
                    statement.execute({ usernameParam : username });
                });
                
                return result;
            },
            insertNewUser : function(username, password) {
                var conn = getSQLConnection(); // called from utils.js
                
                conn.on('connect', function() {
                    var statement = conn.createStatement('BEGIN EXEC SPInsertNewUser @usernameParam @passwordParam END', {
                        usernameParam: { type: 'VarChar', size: 255 },
                        passwordParam: { type: 'VarChar', size: 255 }
                    });
                    statement.on('error', function(err) {
                        if(err) {
                            // error handler here
                            console.log(err);
                        }
                    });
                    statement.execute({ usernameParam : username,
                                        passwordParam : password
                                      });
                });
            }
        }
        
        return userResource;
    });


// alternative method in progress..
app.get('/sql/getUserByUsername/:username', function(req, res) { 
    var result;
    var conn = getSQLConnection(); // called from utils.js
    
    conn.on('connect', function() {
        var statement = conn.createStatement('BEGIN EXEC SPGetUserByUsername @usernameParam END', {
            usernameParam: { type: 'VarChar', size: 255 }
        });
        statement.on('error', function(err) {
            if(err) {
                // error handler here
                console.log(err);
                fn(err);
            }
        });
        statement.on('row', function(row) {
            console.log('user found!');
            result = row;
        });
        statement.execute({ usernameParam : req.params.username });
    });
    
    return result;
});
