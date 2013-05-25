
exports.getCommonRoomConversationsProxy = function(req, res) {
    var util = require('./util.js');
    var promise = exports.getCommonRoomConversations(req.params.commonRoomID);
    util.initPromiseCallback(promise, res);
}

exports.getCommonRoomConversations = function(commonRoomID) {
    var util = require('./util.js');
    return util.generalQuery('BEGIN EXEC SPGetConversationsByCommonRoom @commonRoomIDParam END', {
            commonRoomIDParam: { type: 'Int' }
        }, { 
            commonRoomIDParam : commonRoomID
        });
}
