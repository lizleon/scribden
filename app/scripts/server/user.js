exports.getScribdenUserByUsernameProxy = function(req, res) {
    var util = require('./util.js');
    var promise = exports.getScribdenUserByUsername(req.params.username);
    util.initPromiseCallback(promise, res);
}

exports.getScribdenUserByUsername = function(username) {
    var util = require('./sql-util.js');
    return util.generalQuery('SELECT  ScribdenUserKey, ' +
                                      'Username, ' +
                                      'Password, ' +
                                      'Email, ' +
                                      'Active, ' +
                                      'ModDate ' +
                              'FROM ScribdenUser ' +
                              'WHERE Username = ? ' +
                                  'AND Active = 1',
                            [username]);
}

exports.getScribdenUserByIdProxy = function(req, res) {
    var util = require('./util.js');
    var promise = exports.getScribdenUserById(req.params.id);
    util.initPromiseCallback(promise, res);
}

exports.getScribdenUserById = function(id) {
    var util = require('./sql-util.js');
    return util.generalQuery('SELECT  ScribdenUserKey, ' +
                                      'Username, ' +
                                      'Password, ' +
                                      'Email, ' +
                                      'Active, ' +
                                      'ModDate ' +
                              'FROM ScribdenUser ' +
                              'WHERE ScribdenUserKey = ? '+
                                  'AND Active = 1',
                                [id]);
}

exports.insertScribdenUserProxy = function(req, res) {
    var util = require('./util.js');
    var promise = exports.insertScribdenUser(req.body.username, req.body.password, req.body.email);
    util.initPromiseCallback(promise, res);
}

exports.insertScribdenUser = function(username, password, email) {
    var util = require('./sql-util.js');
    return util.generalQuery('INSERT INTO ScribdenUser (Username, Password, Email) ' +
                              'VALUES (?, ?, ?)',
                              [username, password, email]);
}
