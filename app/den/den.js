'use strict';

angular.module('den', ['den.manage-common-rooms'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/den', {
        templateUrl: 'den/den.html',
        controller: 'DenCtrl'
      })
  }])
  .controller('DenCtrl', [ 'CommonRoom', '$scope', '$cookieStore', function DenCtrl(CommonRoom, $scope, $cookieStore) {
      $scope.commonRooms = {};
      $scope.userid = $cookieStore.get('user_id');
      CommonRoom.query({
          path: 'userid/' + $cookieStore.get('user_id'),
          successCallback: function(data) {
              try {
                  console.log(data.result);
                  if(data.result && data.result.length > 0) {
                      $scope.commonRooms = data.result;
                  }
                  else {
                      $scope.commonRooms = new Array();
                  }
              } catch(e) {
                  // error handler here
                  console.log(e);
              }
          }
      });
  }]);