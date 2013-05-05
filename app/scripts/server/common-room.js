
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
    var promise = exports.insertCommonRoom(req.body.userid, req.body.name, req.body.description, req.body.isPublic, req.body.bannerURL, req.body.homeBGURL);
    util.initPromiseCallback(promise, res);
}

exports.insertCommonRoom = function(userid, name, description, isPublic, banner, homeBG) {
    console.log(userid + ',' + name + ',' + description + ',' + isPublic + ',' + banner + ',' + homeBG);
    var Q = require('q');
    var util = require('./util.js');
    var members = require('./members.js');
    var deferred = Q.defer();
    var bannerParam;
    var homeBGParam;
    
    if(banner) {
        bannerParam = { type: 'VarChar', size: 255 };
    }
    else {
        bannerParam = { type: 'Object' };
    }
    
    if(homeBG) {
        homeBGParam = { type: 'VarChar', size: 255 };
    }
    else {
        homeBGParam = { type: 'Object' };
    }
    
    var cPromise = util.generalQuery('BEGIN EXEC SPInsertCommonRoom @nameParam, @descriptionParam, @isPublicParam, @bannerParam, @homeBGParam END', {
            nameParam: { type: 'VarChar', size: 255 },
            descriptionParam: { type: 'VarChar', size: 255 },
            isPublicParam: { type: 'Bit' },
            bannerParam: { type: 'VarChar', size: 255 },
            homeBGParam: { type: 'VarChar', size: 255 }
        }, { 
            nameParam: name,
            descriptionParam: description,
            isPublicParam: isPublic,
            bannerParam: banner || null,
            homeBGParam: homeBG || null
        });
    cPromise.then(function(value) {
        console.log('added common room: ' + value);
        var listUserStatuses = require('./list-user-status.js');
        console.log(listUserStatuses);
        var mPromise = members.insertMember(userid, listUserStatuses.ACTIVE, value[0], 1, 1);
        
        mPromise.then(function(value) {
            console.log('added member');
            deferred.resolve(true);
        }, function(reason) {
            deferred.reject(new Error(reason)); 
        });
    }, function(reason) {
        deferred.reject(new Error(reason));
    });
        
    return deferred.promise;
}