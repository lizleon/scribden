'use_strict';

var express = require('express'),
    sql = require('tds'), // sql library
    app = module.exports.app = express(),
    sqlConfig = {
        "host": process.env.RDS_HOSTNAME,
        "port": process.env.RDS_PORT,
        "user": process.env.RDS_USERNAME,
        "password": process.env.RDS_PASSWORD,
        "database": process.env.PARAM5
    },
    dbConnect = require('./scripts/server/sql-util.js'), // function for connecting to the DB
    Q = require('q'), // library that assists in resolving variables that are waiting to hear from the server
    port = process.env.PORT || 3000,
    emptyQuery = { 'meta' : [ { } ], 'rows' : [ { } ] },
    API_PATH = '/api/v1/'; // base url to use when calling the server

// handles registration, logging in, and session authentication
apiLogin = require('./scripts/server/login.js');
// handles user data
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
app.get(API_PATH + 'user/name/:username', apiUser.getScribdenUserByUsername);
app.post(API_PATH + 'user', apiUser.insertScribdenUser);

app.listen(port, function() {
    console.log("Listening on " + port);
});