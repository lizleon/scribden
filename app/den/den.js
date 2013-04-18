'use strict';

angular.module('den', ['den.manage-common-rooms'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/den', {
        templateUrl: 'den/den.html',
        controller: 'DenCtrl'
      })
  }])
  .controller('DenCtrl', [ '$scope', '$http', '$location', function DenCtrl($scope, $http, $location) {
      
  }]);