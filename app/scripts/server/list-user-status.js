var ACTIVE = 1,
    SUSPENDED = 2,
    BANNED = 3;

exports.ACTIVE = ACTIVE;
exports.SUSPENDED = SUSPENDED;
exports.BANNED = BANNED;

// @TODO
/*
exports.getListUserStatusesProxy = function(req, res) {
    var util = require('./util.js');
    var promise = exports.getListUserStatuses();
    util.initPromiseCallback(promise, res);
}

exports.getListUserStatuses = function(userid) {
    var util = require('./util.js');
    return util.generalQuery('BEGIN EXEC SPGetListUserStatuses END', {}, {});
}
*/
