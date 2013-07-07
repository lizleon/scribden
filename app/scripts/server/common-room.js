
exports.getCommonRoomsByScribdenUserProxy = function(req, res) {
    var util = require('./util.js');
    var promise = exports.getCommonRoomsByScribdenUser(req.params.userid);
    util.initPromiseCallback(promise, res);
}

exports.getCommonRoomsByScribdenUser = function(userid) {
    var util = require('./util.js');
    return util.generalQuery('SELECT  CR.CommonRoomKey, ' +
                                        'CR.Name, ' +
                                        'CR.Description, ' +
                                        'CR.isPublic, ' +
                                        'CR.Banner, ' +
                                        'CR.HomeBG, ' +
                                        'M.isModerator, ' +
                                        'CR.Active, ' +
                                        'CR.ModDate ' +
                                'FROM CommonRoom CR ' +
                                'INNER JOIN Members M ' +
                                    'ON M.fCommonRoomKey = CR.CommonRoomKey ' +
                                'WHERE ' +
                                    'M.fScribdenUserKey = ? ' +
                                    'AND M.Approved = 1 ' +
                                    'AND CR.Active = 1 ' +
                                    'AND M.Active = 1 ',
                                [userid]);
}

exports.getUserCommonRoomByIdProxy = function(req, res) {
    var util = require('./util.js');
    var promise = exports.getUserCommonRoomById(req.params.commonRoomID, req.params.userid);
    util.initPromiseCallback(promise, res);
}

exports.getUserCommonRoomById = function(commonRoomID, userid) {
    var util = require('./util.js');
    return util.generalQuery('SELECT  CR.CommonRoomKey, ' +
                                        'CR.Name, ' +
                                        'CR.Description, ' +
                                        'CR.isPublic, ' +
                                        'CR.Banner, ' +
                                        'CR.HomeBG, ' +
                                        'M.isModerator, ' +
                                        'M.Approved, ' +
                                        'M.fListUserStatusKey ' +
                                'FROM CommonRoom CR ' +
                                'INNER JOIN Members M ' +
                                    'ON M.fCommonRoomKey = CR.CommonRoomKey ' +
                                'WHERE ' +
                                    'CR.CommonRoomKey = ? ' +
                                    'AND M.fScribdenUserKey = ? ' +
                                    'AND CR.Active = 1 ' +
                                    'AND M.Active = 1',
                                    [commonRoomID, userid]);
}

exports.updateCommonRoomProxy = function(req, res) {
    var util = require('./util.js');
    var promise = exports.updateCommonRoom(req.body.commonRoomID, req.body.name, req.body.description, req.body.isPublic, req.body.bannerURL, req.body.homeBGURL);
    util.initPromiseCallback(promise, res);
}

exports.updateCommonRoom = function(commonRoomID, name, description, isPublic, banner, homeBG) {
    var util = require('./util.js');
    var query = 'UPDATE CommonRoom ';
    var params = [];
    
    if(name) {
        query += 'SET Name = ?, ';
        params.push(name);
    }
    if(description) {
        query += 'SET Description = ?, ';
        params.push(description);
    }
    if(isPublic) {
        query += 'SET IsPublic = ?, ';
        params.push(isPublic);
    }
    if(banner) {
        query += 'SET Banner = ?, ';
        params.push(banner);
    }
    if(homeBG) {
        query += 'SET HomeBG = ?, ';
        params.push(homeBG);
    }
    
    if(params.length > 0) {
        query = query.substring(0, query.length - 2);
        console.log(query);
        query += ' WHERE CommonRoomKey = ? ';
        params.push(commonRoomID);
        
        return util.generalQuery(query, params);
    }
    else {
        return null; // @TODO: Replace these with ORM
    }
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
    
    if(!banner) {
        banner = 'null';
    }
    
    if(!homeBG) {
        homeBG = 'null';
    }
    
    var cPromise = util.generalQuery('INSERT INTO CommonRoom( Name, ' +
                                                                'Description, ' +
                                                                'isPublic, ' +
                                                                'Banner, ' +
                                                                'HomeBG ) ' +
                                        'VALUES( ?, ' +
                                                '?, ' +
                                                '?, ' +
                                                '?, ' +
                                                '? ) ' +
                                        'SELECT LAST_INSERT_ID() as CommonRoomKey',
                                        [name, description, isPublic, banner, homeBG]);
    
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