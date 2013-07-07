
exports.getCommonRoomConversationsProxy = function(req, res) {
    var util = require('./util.js');
    var promise = exports.getCommonRoomConversations(req.params.commonRoomID);
    util.initPromiseCallback(promise, res);
}

exports.getCommonRoomConversations = function(commonRoomID) {
    var util = require('./util.js');
    return util.generalQuery('SELECT	C.ConversationKey, '
                                        'MIN(P.PostKey) as PostKey, ' + // First post
                                        'C.IsClosed, ' +
                                        'P.Content, ' +
                                        'P.fScribdenUserKey, ' +
                                        'SU.Username ' +                // Add user profile pic later
                                'FROM	Conversation C ' +
                                'INNER JOIN Post P' +
                                    'ON P.fParentConversationKey = C.ConversationKey ' +
                                'INNER JOIN ScribdenUser SU ' +
                                    'ON SU.ScribdenUserKey = P.fScribdenUserKey ' +
                                'WHERE ' +
                                    'C.fCommonRoomKey = @CommonRoomKey ' +
                                    'AND C.IsBranch = 0 ' +
                                    'AND C.Active = 1 ' +
                                    'AND P.Active = 1 ' +
                                'GROUP BY C.ConversationKey, C.IsClosed, P.Content, P.fScribdenUserKey, SU.Username, C.ModDate ' +
                                'ORDER BY C.ModDate DESC',
                                [commonRoomID]);
}
