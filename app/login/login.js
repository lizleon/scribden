'use strict';

angular.module('scribden-login', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'login/register.html',
        controller: 'RegisterCtrl'
      });
  }])
  .controller('LoginCtrl', [ '$scope', function LoginCtrl($scope) { } ])
  .controller('RegisterCtrl', [ '$scope', '$http', '$location', function RegisterCtrl($scope, $http, $location) {
      $scope.form = {};
      $scope.register = function () {
          $http.post('/authenticate', $scope.form)
          .success(function(data) {
              //$location.path('/dashboard');
              console.log('success');
          })
          .error(function(err) {
              console.log(err);
          });
      };
  } ])
  ;