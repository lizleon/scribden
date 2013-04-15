'use strict';
// handles registration, logging in, and session authentication
angular.module('den', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/den', {
        templateUrl: 'den/den.html',
        controller: 'DenCtrl'
      })
  }])
  .controller('DenCtrl', [ '$scope', '$http', '$location', function DenCtrl($scope, $http, $location) {
      
  }]);