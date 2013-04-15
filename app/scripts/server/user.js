exports.getScribdenUserByUsernameProxy = function(req, res) {
    var util = require('./util.js');
    var promise = exports.getScribdenUserByUsername(req.params.username);
    util.initPromiseCallback(promise, res);
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
    var promise = exports.getScribdenUserById(req.params.id);
    util.initPromiseCallback(promise, res);
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
    var promise = exports.insertScribdenUser(req.body.username, req.body.password, req.body.email);
    util.initPromiseCallback(promise, res);
}

exports.insertScribdenUser = function(username, password, email) {
    var util = require('./util.js');
    return util.generalQuery('BEGIN EXEC SPInsertScribdenUser @usernameParam, @passwordParam, @emailParam END', {
            usernameParam: { type: 'VarChar', size: 32 },
            passwordParam: { type: 'VarChar', size: 15 },
            emailParam: { type: 'VarChar', size: 255 }
        }, { 
            usernameParam : username,
            passwordParam : password,
            emailParam : email
        });
}
