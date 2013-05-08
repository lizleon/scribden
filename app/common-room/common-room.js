'use strict';

angular.module('common-room', ['resources.common-room', 'ngCookies'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/common-room/:commonRoomID', {
        templateUrl: 'common-room/common-room.html',
        controller: 'CommonRoomCtrl',
        resolve: {
            commonRoomData: ['CommonRoom', '$route', '$cookieStore', function(CommonRoom, $route, $cookieStore) {
                return CommonRoom.query({
                    path: $route.current.params.commonRoomID + '/' + $cookieStore.get('user_id')
                });
            }]
            /*
            security: ['security', '$route', function(security, route){
                // check that the user is allowed to access this common room
                // Must be approved and not under disciplinary action
                return security.verifyCommonRoomAccess($route.current.params.commonRoomID);
            }]
            */
        }
      })
  }])
  .controller('CommonRoomCtrl', [ 'CommonRoom', 'commonRoomData', '$scope', '$cookieStore', function CommonRoomCtrl(CommonRoom, commonRoomData, $scope, $cookieStore) {
      $scope.commonRoom = commonRoomData;
      $scope.userid = $cookieStore.get('user_id');
  }]);
