exports.getScribdenUserByUsernameProxy = function(req, res) {
    var util = require('./util.js');
    var deferred = exports.getScribdenUserByUsername(req.params.username);
    util.initPromiseCallback(deferred, res);
}

exports.getScribdenUserByUsername = function(username) {
    var util = require('./util.js');
    return util.generalQuery('BEGIN EXEC SPGetScribdenUserByUsername @usernameParam END', {
            usernameParam: { type: 'VarChar', size: 255 }
        }, { 
            usernameParam : username 
        });
}

exports.getScribdenUserByIdProxy = function(req, res) {
    var util = require('./util.js');
    var deferred = exports.getScribdenUserById(req.params.id);
    util.initPromiseCallback(deferred, res);
}

exports.getScribdenUserById = function(id) {
    var util = require('./util.js');
    return util.generalQuery('BEGIN EXEC SPGetScribdenUserById @ScribdenUserKey END', {
            idParam: { type: 'Int' }
        }, { 
            idParam : id
        });
}

exports.insertScribdenUserProxy = function(req, res) {
    var util = require('./util.js');
    var deferred = exports.insertScribdenUser(req.body.username, req.body.password);
    util.initPromiseCallback(deferred, res);
}

exports.insertScribdenUser = function(req, res) {
    var util = require('./util.js');
    return util.generalQuery('BEGIN EXEC SPInsertScribdenUser @usernameParam, @passwordParam END', {
            usernameParam: { type: 'VarChar', size: 255 },
            passwordParam: { type: 'VarChar', size: 255 }
        }, { 
            usernameParam : req.body.username,
            passwordParam : req.body.password
        });
}
