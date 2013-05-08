'use strict';
// define root application
angular.module('ScribdenApp', [
    'resources.scribden-resource',
    'resources.user',
    'login',
    'den',
    'common-room'
])
  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/login'
      })
  })
  // base url to use when calling the server
  .constant('API_PATH', {
        baseURL: '/api/v1/'
});
