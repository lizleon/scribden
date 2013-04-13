'use strict';

angular.module('login', ['resources.user'])
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
  .controller('RegisterCtrl', [ 'User', '$scope', '$http', '$location', function RegisterCtrl(User, $scope, $http, $location) {
      $scope.form = {};
      $scope.register = function () {
          User.insert({ 
              data: $scope.form,
              successCallback: function(data) {
                  $http.post('/authenticate', $scope.form)
                      .success(function(data) {
                          $location.path('/dashboard');
                          console.log('success');
                      })
                      .error(function(err) {
                          console.log(err);
                      });
              }
          });
      };
  } ])
  ;