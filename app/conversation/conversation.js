'use strict';

angular.module('conversation', ['resources.conversation'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/conversation/:conversationID', {
        templateUrl: 'conversation/conversation.html',
        controller: 'ConversationCtrl'
      })
      .when('/conversation/common-room/:commonRoomID', {
        templateUrl: 'conversation/add-conversation.html',
        controller: 'ConversationCtrl'
      })
  }])
  .controller('ConversationCtrl', [ 'Conversation', '$scope', '$cookieStore', function ConversationCtrl(Conversation, $scope, $cookieStore) {
      
  }])
  .controller('ConversationViewCtrl', [ 'Conversation', '$scope', '$cookieStore', function ConversationViewCtrl(Conversation, $scope, $cookieStore) {
      
  }])
  .controller('ConversationAddCtrl', [ 'Conversation', '$scope', '$cookieStore', function ConversationAddCtrl(Conversation, $scope, $cookieStore) {
      
  }]);