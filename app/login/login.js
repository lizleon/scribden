'use strict';
// handles registration, logging in, and session authentication
angular.module('login', ['resources.user', 'den', 'ngCookies'])
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
  .controller('LoginCtrl', [ '$scope', '$http', '$location', '$cookieStore', function LoginCtrl($scope, $http, $location, $cookieStore) {
      $scope.form = {};
      $scope.login = function() {
          // authenticate the user and redirect to their den
          var authenticatePromise = $http.post('/authenticate', $scope.form);
          authenticatePromise.then(function(value) {
                  if(value.data.error) {
                      // error handler here
                      console.log(value.data.error);
                      $scope.form.password = '';
                  }
                  else {
                      // save the user's id for the duration of the session
                      $cookieStore.put('user_id', value.data.result);
                      $location.path('/den');
                  }
              }, function(reason) {
                  // error handler here
                  console.log(reason);
              });
      }
  } ])
  .controller('RegisterCtrl', [ 'User', '$scope', '$http', '$location', function RegisterCtrl(User, $scope, $http, $location) {
      // variable will be filled with html elements using 'form.<element>'
      $scope.form = {};
      $scope.isUsernameValid = true;
      $scope.isUsernameAvailable = true;
      $scope.isEmailValid = true;
      $scope.isPasswordValid = true;
      $scope.isPasswordMatched = true;
      
      // register the user
      $scope.register = function() {
          // validate form
          var usernameValidation = /^([a-zA-Z0-9_-]){3,32}$/;
          var emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          var passwordValidation = /^[a-zA-Z0-9!@$%^&-_]{6,16}$/;
          $scope.isUsernameValid = usernameValidation.test($scope.form.username);
          $scope.isEmailValid = emailValidation.test($scope.form.email);
          $scope.isPasswordValid = passwordValidation.test($scope.form.password) && passwordValidation.test($scope.form.confirmpwd);
          $scope.isPasswordMatched = $scope.form.password == $scope.form.confirmpwd;
          
          // check form validity
          if($scope.isUsernameValid && $scope.isEmailValid && $scope.isPasswordValid && $scope.isPasswordMatched) {
              // check username availability
              User.query({
                  path: 'name/' + $scope.form.username,
                  successCallback: function(data) {
                      if(data.result && data.result.length > 0) {
                          $scope.isUsernameAvailable = false;
                      }
                      else {
                          // register new user
                          User.insert({
                              data: $scope.form,
                              successCallback: function(data) {
                                    if(data.error) {
                                      // error handler here
                                      console.log(data.error);
                                    }
                                    else if(data.result) {
                                      $location.path('/login');
                                    }
                                    else {
                                      // error handler here
                                      console.log('insert failed, no error returned');
                                    }
                                }
                            });
                      }
                  }
              });
          }
          else {
              // reset password fields
              $scope.form.password = '';
              $scope.form.confirmpwd = '';
          }
        };
  }]);
