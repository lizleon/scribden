exports.getScribdenUserByUsername = function(req, res) { 
    var deferred = Q.defer();
    var result = new Array();
    var conn = getSQLConnection(); // called from utils.js
    
    conn.then(function(response) {
        var statement = conn.createStatement('BEGIN EXEC SPGetScribdenUserByUsername @usernameParam END', {
            usernameParam: { type: 'VarChar', size: 255 }
        });
        statement.on('error', function(err) {
            if(err) {
                // error handler here
                console.log(err);
                deferred.reject(new Error(err));
            }
        });
        statement.on('row', function(row) {
            console.log('user found!');
            result.push(row);
        }).on('done', function(data) {
            deferred.resolve(result);
        });
        statement.execute({ usernameParam : req.params.username });
    });
    
    return deferred.promise;
};

exports.insertScribdenUser = function(req, res) {
    var conn = getSQLConnection(); // called from utils.js
    var result = Q.defer();
    
    conn.then(function() {
        var statement = conn.createStatement('BEGIN EXEC SPInsertScribdenUser @usernameParam @passwordParam END', {
            usernameParam: { type: 'VarChar', size: 255 },
            passwordParam: { type: 'VarChar', size: 255 }
        });
        statement.on('error', function(err) {
            if(err) {
                // error handler here
                console.log(err);
                result.reject(new Error(err));
            }
            else {
                result.resolve(true);
            }
        });
        statement.execute({ usernameParam : req.body.username,
                            passwordParam : req.body.password
                          });
    });
    
    return result.promise;
};