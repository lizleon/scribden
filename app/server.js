'use_strict';

var express = require('express'),
    app = module.exports.app = express();

var port = process.env.PORT || 3000;
    
app.configure(function () {
	app.use(express.favicon());
	app.use(express.bodyParser());
	app.use(express.logger('dev'));  //tiny, short, default
	app.use(app.router);
	app.use(express.static(__dirname));
	app.use(express.errorHandler({dumpExceptions: true, showStack: true, showMessage: true}));
});

app.listen(port, function() {
    console.log("Listening on " + port);
});