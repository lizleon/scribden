'use strict';
// handles registration, logging in, and session authentication
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
      // variable will be filled with html elements using 'form.<element>'
      $scope.form = {};
      // @TODO: validation for username
      // @TODO: validation for password
      // @TODO: verify that the passwords match
      
      // register the user
      $scope.register = function() {
          /*
          User.query({
              path: 'name/' + $scope.form.username,
              successCallback: function(data) {
                  console.log(data);
              }
          });
          */
                      $http.post('/authenticate', $scope.form)
                          .success(function(data) {
                              console.log('authenticated!');
                              $location.path('/dashboard');
                          })
                          .error(function(err) {
                              console.log('error');
                              console.log(err);
                          });
          /*
          User.insert({
              data: $scope.form,
              successCallback: function(data) {
                    if(data.error) {
                      // error handler here
                      console.log(data.error);
                    }
                    else if(data.result) {
                      // authenticate the user and redirect to their den
                      $http.post('/authenticate', $scope.form)
                          .success(function(data) {
                              $location.path('/dashboard');
                              console.log('success');
                          })
                          .error(function(err) {
                              console.log(err);
                          }); 
                    }
                    else {
                      // error handler here
                      console.log('insert failed, no error returned');
                    }
                }
            });*/
        };
  }]);
