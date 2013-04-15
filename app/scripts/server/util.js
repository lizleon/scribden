exports.initPromiseCallback = function(deferred, res) {
    deferred.then(function(value) {
        res.json({
            result: value,
            error: undefined
        });        
    }, function(reason) {
        res.json({
            result: undefined,
            error: reason
        });
    });
}

exports.generalQuery = function(sqlStatement, params, values) {
    var Q = require('q');
    var dbConnect = require('./sql-util.js');
    var deferred = Q.defer();
    var result = new Array();
    var connPromise = dbConnect.getSQLConnection(); // called from utils.js; connect to the db
    
    connPromise.then(function(conn) {
        var statement = conn.createStatement(sqlStatement, params);
        statement.on('error', function(err) {
            // error handler here
            console.log(err);
            conn.end();
            deferred.reject(new Error(err));
        })
        .on('row', function(row) {
            resultRow = new Array();
            
            // results are returned as a buffer
            // call getValue in order to get usable results
            for(var i = 0; i < row.metadata.columns.length; i++) {
                resultRow.push(row.getValue(i));
            }
            
            result.push(resultRow);
        })
        .on('done', function(response) {
            conn.end();
            if(response.isError) {
                // error handler here
                console.log('statement completed, insert failed...');
                deferred.reject(new Error(err));
            }
            else {
                deferred.resolve(result);
            }
        });
        statement.execute(values);
    });
    
    return deferred.promise;
}