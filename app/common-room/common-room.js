'use strict';
// If using a resolve block, the controller that contains a resolve block cannot be an ng-controller in the html.
// A child controller must be created, and that will get the resolved variables. This controller is what should
// be used as the ng-controller
angular.module('common-room', ['resources.common-room', 'resources.conversation', 'ngCookies'])
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
      .when('/common-room/:commonRoomID/conversation', {
        templateUrl: 'common-room/view-conversations.html',
        controller: 'CommonRoomCtrl',
        resolve: {
            commonRoomData: ['CommonRoom', '$route', '$cookieStore', function(CommonRoom, $route, $cookieStore) {
                return CommonRoom.query({
                    path: $route.current.params.commonRoomID + '/' + $cookieStore.get('user_id')
                });
            }],
            conversations: ['Conversation', '$route', function(Conversation, $route) {
                return Conversation.query({
                    path: 'common-room/' + $route.current.params.commonRoomID
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
      $scope.commonRoom = commonRoomData.result[0];
      $scope.userid = $cookieStore.get('user_id');
  }])
  .controller('CommonRoomHomeViewCtrl', [ 'CommonRoom', '$scope', '$cookieStore', function CommonRoomHomeViewCtrl(CommonRoom, $scope, $cookieStore) {
      //$scope.userid = $cookieStore.get('user_id');
  }])
  .controller('CommonRoomConversationViewCtrl', [ 'CommonRoom', '$scope', '$cookieStore', function CommonRoomConversationViewCtrl(CommonRoom, $scope, $cookieStore) {
      console.log('arrived');
      console.log(conversations);
      $scope.conversations = conversations.result;
  }]);