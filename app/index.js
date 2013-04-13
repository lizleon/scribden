'use strict';

angular.module('ScribdenApp', [
    'resources.scribden-resource',
    'resources.user',
    'login'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  })
  .constant('API_PATH', {
        baseURL: '/api/V1/'
});
