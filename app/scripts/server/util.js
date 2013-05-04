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

exports.uploadFile = function(req, res) {
    // @TODO: move to config file
    var s3BucketName = process.env.PARAM1 || 'elasticbeanstalk-us-east-1-045472282667';
    var awsAccessKeyID = process.env.AWS_ACCESS_KEY_ID || 'AKIAIHOET2BPVPNPRCDA';
    var awsSecretKey = process.env.AWS_SECRET_KEY || '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';
    
    var encode64 = require('../../lib/awsquerysigner/ecmanaut.base64.js');
    var hmac = require('../../lib/awsquerysigner/jssha256.js');
    var objectName = req.params.s3objectname;
    var mimeType = req.params.s3objecttype;
    var expires = (Date.now() / 1000) + 100; // PUT request to S3 must start within 100 seconds
    
    var amzHeaders = 'x-amz-acl:public-read'; // set the public read permission on the uploaded file
    var stringToSign = 'PUT\n\nimage/' + mimeType + '\n' + expires + '\n' + amzHeaders + '\n/' + s3BucketName + '/' + objectName;
    var sig = encodeURI(encode64.Base64.encode(hmac.HMAC_SHA256_MAC(awsSecretKey, stringToSign)));
    var url = 'https://' + s3BucketName + '.s3.amazonaws.com/' + objectName;
    res.json({
        signed_request: encodeURI(url + '?AWSAccessKeyId=' + awsAccessKeyID + '&Expires=' + expires + '&Signature=' + sig),
        url: url
    });
}
