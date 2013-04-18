'use strict';
// handles registration, logging in, and session authentication
angular.module('den.manage-common-rooms', ['resources.common-room'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/den/manage-common-rooms', {
        templateUrl: 'den/manage-common-rooms/manage-common-rooms.html',
        controller: 'ManageCommonRoomsCtrl'
      })
  }])
  .controller('ManageCommonRoomsCtrl', ['CommonRoom', '$scope', '$rootScope', function ManageCommonRoomsCtrl(CommonRoom, $scope, $rootScope) {
      $scope.commonRooms = {};
      $scope.moderatorFilter = '';
      
      CommonRoom.query({
          path: 'userid/' + $rootScope.user_id,
          successCallback: function(data) {
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
              for(var i = 0; i < $scope.commonRooms.length; i++) {
                  if($rootScope.user_id == $scope.commonRooms.fScribdenUserKey) {
                      moderatedCommonRooms++;
                  }
              }
              /*
              while(moderatedCommonRooms < $scope.MAX_COMMON_ROOMS) {
                  $scope.commonRooms.push(new Array());
              }
              */
          }
      });
      
      $scope.showModeratedCommonRooms = function() {
          $scope.moderatorFilter = $rootScope.user_id;
      };
      
      $scope.showParticipatedCommonRooms = function() {
          $scope.moderatorFilter = '';
      };
      
      $scope.editCommonRoom = function(data) {
          /*
          if(no data) {
            $rootScope.newCommonRoom = true;
          }
          else {
            $rootScope.newCommonRoom = false;
            $rootScope.editingCommonRoom = data;
          }
          */
      }
  }])
  .controller('EditCommonRoomModal', ['CommonRoom', '$scope', '$http', '$location', '$rootScope', function EditCommonRoomModal(CommonRoom, $scope, $http, $location, $rootScope) {
      $scope.editingCommonRoom = $rootScope.editingCommonRoom;
      $scope.form = $rootScope.editingCommonRoom;
      
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