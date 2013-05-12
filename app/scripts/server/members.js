exports.insertMember = function(userid, listUserStatusID, commonRoomID, approved, isModerator) {
    var util = require('./util.js');
    return util.generalQuery('BEGIN EXEC SPInsertMember @useridParam, @listUserStatusIDParam, @commonRoomIDParam, @approvedParam, @isModeratorParam END', {
            useridParam: { type: 'Int' },
            listUserStatusIDParam: { type: 'Int' },
            commonRoomIDParam: { type: 'Int' },
            approvedParam: { type: 'Bit' },
            isModeratorParam: { type: 'Bit' }
        }, { 
            useridParam: userid,
            listUserStatusIDParam: listUserStatusID,
            commonRoomIDParam: commonRoomID,
            approvedParam: approved,
            isModeratorParam: isModerator
        });
}
