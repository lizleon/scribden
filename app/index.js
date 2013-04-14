'use strict';
// define root application
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
  // base url to use when calling the server
  .constant('API_PATH', {
        baseURL: '/api/v1/'
});
