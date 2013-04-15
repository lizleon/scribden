var sqlConfig = {
    "host": process.env.RDS_HOSTNAME || 'aa1ei41n0xy1pya.csbyj0crnkqp.us-east-1.rds.amazonaws.com',
    "port": process.env.RDS_PORT || '1433',
    "user": process.env.RDS_USERNAME || 'scribdenadmin',
    "password": process.env.RDS_PASSWORD || 'AlbireoGraveyard',
    "database": process.env.PARAM5 || 'Production'
}

// var sql declared in scripts/server.js
exports.getSQLConnection = function() {
    // create a connection to the DB
    var Q = require('Q');
    var sql = require('tds');
    var result = Q.defer();
    
    var conn = new sql.Connection({
        host: sqlConfig.host,
        port: sqlConfig.port,
        database: sqlConfig.database,
        userName: sqlConfig.user,
        password: sqlConfig.password
    });
    
    // connect to the DB
    conn.connect(function(error) {
        if (error != null) 
        {
            // error handling here
            console.error('Received error', error);
            result.reject(new Error(error));
        } 
        else 
        {
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