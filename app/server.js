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
    dbConnect = require('./scripts/server/util.js'),
    Q = require('q'),
    port = process.env.PORT || 3000,
    emptyQuery = { 'meta' : [ { } ], 'rows' : [ { } ] },
    API_PATH = '/api/v1';

apiLogin = require('./scripts/server/login.js');
apiUser = require('./scripts/server/user.js');
    
app.configure(function () {
	app.use(express.favicon());
	app.use(express.bodyParser());
	app.use(express.logger('dev'));  //tiny, short, default
    app.use(apiLogin.passport.initialize());
    //app.use(apiLogin.passport.session());
	app.use(app.router);
	app.use(express.static(__dirname)); // routes the user to the home page
	app.use(express.errorHandler({dumpExceptions: true, showStack: true, showMessage: true}));
});

app.post('/authenticate', apiLogin.authenticate);
app.get(API_PATH + '/user/name/:username', apiUser.getScribdenUserByUsername);
app.post(API_PATH + '/user/', apiUser.insertScribdenUser);

app.listen(port, function() {
    console.log("Listening on " + port);
});