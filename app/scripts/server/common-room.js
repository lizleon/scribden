
exports.getCommonRoomsByScribdenUserProxy = function(req, res) {
    var util = require('./util.js');
    var promise = exports.getCommonRoomsByScribdenUser(req.params.user_id);
    util.initPromiseCallback(promise, res);
}

exports.getCommonRoomsByScribdenUser = function(userid) {
    var util = require('./util.js');
    return util.generalQuery('BEGIN EXEC SPGetCommonRoomsByScribdenUser @useridParam END', {
            useridParam: { type: 'Int' }
        }, { 
            useridParam : userid
        });
}

exports.insertCommonRoomProxy = function(req, res) {
    var util = require('./util.js');
    var promise = exports.insertCommonRoom(req.params.name, req.params.description, req.params.userid, req.params.isPublic, req.params.banner, req.params.homeBG);
    util.initPromiseCallback(promise, res);
}

exports.insertCommonRoom = function(name, description, userid, isPublic, banner, homeBG) {
    var util = require('./util.js');
    return util.generalQuery('BEGIN EXEC SPInsertCommonRoom @nameParam, @descriptionParam, @useridParam, @isPublicParam, @bannerParam, @homeBGParam END', {
            nameParam: { type: 'VarChar', size: 255 },
            descriptionParam: { type: 'VarChar', size: 255 },
            useridParam: { type: 'Int' },
            isPublicParam: { type: 'Bit' },
            bannerParam: { type: 'VarChar', size: 255 },
            homeBGParam: { type: 'VarChar', size: 255 }
        }, { 
            nameParam: name,
            descriptionParam: description,
            useridParam: userid,
            isPublicParam: isPublic,
            bannerParam: banner,
            homeBGParam: homeBG
        });
}