var sqlConfig = {
    "host": process.env.RDS_HOSTNAME || 'aa6f6o0d511ncj.csbyj0crnkqp.us-east-1.rds.amazonaws.com',
    "port": process.env.RDS_PORT || '3306',
    "user": process.env.RDS_USERNAME || 'scribdenadmin',
    "password": process.env.RDS_PASSWORD || 'AlbireoGraveyard',
    "database": process.env.PARAM1 || 'ebdb'
}

exports.generalQuery = function(sqlStatement, params) {
    var Q = require('q');
    var dbConnect = require('./sql-util.js');
    var deferred = Q.defer();
    var result = new Array();
    var connPromise = dbConnect.getSQLConnection(); // connect to the db
    
    connPromise.then(function(conn) {
        conn.query(sqlStatement, params, function(err, results) {
            if(err) {
                console.log(err);
                conn.end();
                deferred.reject(new Error(err));
            }
            
            deferred.resolve(results);
        });
        /*
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
        */
    });
    
    return deferred.promise;
}


// var sql declared in scripts/server.js
exports.getSQLConnection = function() {
    // create a connection to the DB
    var Q = require('q');
    var sql = require('mysql');
    var result = Q.defer();
    
    var conn = new sql.createConnection({
        host: sqlConfig.host,
        port: sqlConfig.port,
        database: sqlConfig.database,
        user: sqlConfig.user,
        password: sqlConfig.password,
        stringifyObjects: true,
        debug: true
    });
    
    handleDisconnect(conn);
    
    // connect to the DB
    conn.connect(function(error) {
        if (error) {
            // error handling here
            console.error('Received error', error);
            result.reject(new Error(error));
        } 
        else {
            result.resolve(conn);
        }
    });
    /*
    // listeners to receive errors and messages
    conn.on('error', function(error) {
      console.error('Received error', error);
    });
    conn.on('message', function(message) {
      console.info('Received info', message);
    });*/
    
    return result.promise;
}

function handleDisconnect(connection) {
  connection.on('error', function(err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('Re-connecting lost connection: ' + err.stack);

    connection = mysql.createConnection(connection.config);
    handleDisconnect(connection);
    connection.connect();
  });
}
