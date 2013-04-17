'use strict';
// handles registration, logging in, and session authentication
angular.module('manage-common-rooms', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/den/manage-common-rooms', {
        templateUrl: 'den/manage-common-rooms/manage-common-rooms.html',
        controller: 'ManageCommonRoomsCtrl'
      })
  }])
  .controller('ManageCommonRoomsCtrl', [ '$scope', '$http', '$location', function ManageCommonRoomsCtrl($scope, $http, $location) {
      
  }]);