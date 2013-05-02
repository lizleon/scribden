
exports.getCommonRoomsByScribdenUserProxy = function(req, res) {
    var util = require('./util.js');
    var promise = exports.getCommonRoomsByScribdenUser(req.params.userid);
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
    var promise = exports.insertCommonRoom(req.body.name, req.body.description, req.body.isPublic, req.body.bannerURL, req.body.homeBGURL);
    util.initPromiseCallback(promise, res);
}

exports.insertCommonRoom = function(name, description, userid, isPublic, banner, homeBG) {
    var util = require('./util.js');
    var members = require('./members.js');
    var Q = require('q');
    var deferred = Q.defer();
    var cPromise = util.generalQuery('BEGIN EXEC SPInsertCommonRoom @nameParam, @descriptionParam, @isPublicParam, @bannerParam, @homeBGParam END', {
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
    cPromise.then(function(value) {
        var listUserStatuses = require('./list-user-status.js');
        var mPromise = members.insertMember(userid, listUserStatuses.ACTIVE, value[0], 1, 1);
        
        mPromise.then(function(value) {
            deferred.resolve(true);
        }, function(reason) {
            deferred.reject(new Error(reason)); 
        });
    }, function(reason) {
        deferred.reject(new Error(reason));
    });
        
    return deferred.promise;
}