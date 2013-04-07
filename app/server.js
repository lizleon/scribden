'use_strict';

var express = require('express'),
    sql = require('tds'),
    app = module.exports.app = express(),
    sqlConfig = {
        "driver": process.env.PARAM1,
        "server": process.env.PARAM2,
        "user": process.env.PARAM3,
        "password": process.env.PARAM4,
        "database": process.env.PARAM5,
        "port": process.env.PORT
    },
    port = process.env.PORT || 3000,
    emptyQuery = { 'meta' : [ { } ], 'rows' : [ { } ] };

apiLogin = require('./scripts/services/login.js');
    
app.configure(function () {
	app.use(express.favicon());
	app.use(express.bodyParser());
	app.use(express.logger('dev'));  //tiny, short, default
    app.use(apiLogin.passport.initialize());
    //app.use(apiLogin.passport.session());
	app.use(app.router);
	app.use(express.static(__dirname));
	app.use(express.errorHandler({dumpExceptions: true, showStack: true, showMessage: true}));
});

app.post('/authenticate', apiLogin.authenticate);

app.listen(port, function() {
    console.log("Listening on " + port);
});