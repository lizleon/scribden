'use strict';
// handles registration, logging in, and session authentication
angular.module('den.manage-common-rooms', ['resources.common-room', 'ngCookies', 'ui.bootstrap'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/den/manage-common-rooms', {
        templateUrl: 'den/manage-common-rooms/manage-common-rooms.html',
        controller: 'ManageCommonRoomsCtrl'
      })
  }])
  .controller('ManageCommonRoomsCtrl', ['CommonRoom', '$scope', '$cookieStore', '$rootScope', '$dialog', function ManageCommonRoomsCtrl(CommonRoom, $scope, $cookieStore, $rootScope, $dialog) {
      $scope.commonRooms = {};
      $scope.moderatorFilter = '';
      $scope.userid = $cookieStore.get('user_id');
      $scope.isModerator = true;
      console.log($cookieStore.get('user_id'));
      console.log('querying common rooms...');
      CommonRoom.query({
          path: 'userid/' + $cookieStore.get('user_id'),
          successCallback: function(data) {
              try {
                  console.log('common rooms received');
                  console.log(data.result);
                  if(data.result && data.result.length > 0) {
                      $scope.commonRooms = data.result;
                  }
                  else {
                      $scope.commonRooms = new Array();
                  }
                  
                  // @TODO: change once premium account exists
                  $scope.MAX_COMMON_ROOMS = 3;
                  
                  var moderatedCommonRooms = 0;
                  var userid = $cookieStore.get('user_id');
                  console.log(userid);
                  for(var i = 0; i < $scope.commonRooms.length; i++) {
                      // check if userid matches moderator userid
                      if(userid == $scope.commonRooms[i][3]) {
                          moderatedCommonRooms++;
                      }
                  }
                  // add empty common rooms
                  while(moderatedCommonRooms < $scope.MAX_COMMON_ROOMS) {
                      $scope.commonRooms.push(new Array(9));
                      moderatedCommonRooms++;
                  }
              } catch(e) {
                  // error handler here
                  console.log(e);
              }
          }
      });
      
      $scope.opts = {
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        templateUrl:  'den/manage-common-rooms/edit-common-room-modal.html',
        controller: 'EditCommonRoomModal'
      };
    
      $scope.openDialog = function(){
        var d = $dialog.dialog($scope.opts);
        d.open().then(function(result){
          if(result)
          {
            console.log(result);
          }
        });
      };
      
      $scope.showModeratedCommonRooms = function() {
          $scope.isModerator = true;
      };
      
      $scope.showParticipatedCommonRooms = function() {
          $scope.isModerator = false;
      };
      
      $scope.editCommonRoom = function(data) {
          if(!data[0]) {
            $rootScope.newCommonRoom = true;
            $rootScope.editingCommonRoom = undefined;
          }
          else {
            $rootScope.newCommonRoom = false;
            $rootScope.editingCommonRoom = data;
          }
          
          $rootScope.dialog = $dialog.dialog($scope.opts);
          $rootScope.dialog.open();
      }
  }])
  .controller('EditCommonRoomModal', ['$scope', '$dialog', '$rootScope', function EditCommonRoomModal($scope, $dialog, $rootScope) {
      $scope.editingCommonRoom = $rootScope.editingCommonRoom;
      $scope.form = {};
      
      $scope.form.isPublic = true;
      if($rootScope.editingCommonRoom) {
          $scope.form.commonRoomKey = $rootScope.editingCommonRoom[0];
          $scope.form.name = $rootScope.editingCommonRoom[1];
          $scope.form.description = $rootScope.editingCommonRoom[2];
          $scope.form.banner = $rootScope.editingCommonRoom[5];
          $scope.form.homeBG = $rootScope.editingCommonRoom[6];
          
          if($rootScope.editingCommonRoom[4])
              $scope.form.isPublic = true;
          else
              $scope.form.isPublic = false;
      }
      
      $scope.close = function() {
          $rootScope.dialog.close();
      }
      // @TODO: update common room stored proc/server logic
      $scope.save = function() {
          if($rootScope.newCommonRoom) {
              console.log('CommonRoom.insert');
          }
          else {
              console.log('CommonRoom.update');
          }
      }
  }]);
