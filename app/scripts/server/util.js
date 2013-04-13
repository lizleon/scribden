// var sql declared in scripts/server.js
function getSQLConnection() {
    // sqlConfig is declared in server.js/sql-config.json
    // create a connection to the DB
    var conn = new sql.Connection({
        host: sqlConfig.host,
        port: sqlConfig.port,
        database: sqlConfig.database,
        userName: sqlConfig.user,
        password: sqlConfig.password
    });
    var result = Q.defer();
    
    // connect to the DB
    conn.connect(function(error) {
        if (error != null) 
        {
            console.error('Received error', error);
            result.reject(new Error(error));
        } 
        else 
        {
            console.log('Now connected, can start using');
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