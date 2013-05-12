'use strict';
// handles registration, logging in, and session authentication
angular.module('den.manage-common-rooms', ['resources.common-room', 'resources.image-handler', 'ngCookies', 'ui.bootstrap', 'ur.file'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/den/manage-common-rooms', {
        templateUrl: 'den/manage-common-rooms/manage-common-rooms.html',
        controller: 'ManageCommonRoomsCtrl'
      })
  }])
  .controller('ManageCommonRoomsCtrl', ['CommonRoom', '$scope', '$cookieStore', '$rootScope', '$dialog', function ManageCommonRoomsCtrl(CommonRoom, $scope, $cookieStore, $rootScope, $dialog) {
      $scope.commonRooms = {};
      $scope.moderatorFilter = '';
      $scope.userid = $cookieStore.get('user_id');
      $scope.isModerator = true;
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
                  
                  // @TODO: change once premium account exists
                  $scope.MAX_COMMON_ROOMS = 3;
                  
                  var moderatedCommonRooms = 0;
                  var userid = $cookieStore.get('user_id');
                  for(var i = 0; i < $scope.commonRooms.length; i++) {
                      // check if isModerator flag is set
                      if($scope.commonRooms[i][6] == 1) {
                          moderatedCommonRooms++;
                      }
                  }
                  // add empty common rooms
                  while(moderatedCommonRooms < $scope.MAX_COMMON_ROOMS) {
                      $scope.commonRooms.push(new Array(9));
                      moderatedCommonRooms++;
                  }
              } catch(e) {
                  // error handler here
                  console.log(e);
              }
          }
      });
      
      $scope.opts = {
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        templateUrl:  'den/manage-common-rooms/edit-common-room-modal.html',
        controller: 'EditCommonRoomModal'
      };
    
      $scope.openDialog = function(){
        var d = $dialog.dialog($scope.opts);
        d.open().then(function(result){
          if(result)
          {
            console.log(result);
          }
        });
      };
      
      $scope.showModeratedCommonRooms = function() {
          $scope.isModerator = true;
      };
      
      $scope.showParticipatedCommonRooms = function() {
          $scope.isModerator = false;
      };
      
      $scope.editCommonRoom = function(data) {
          if(!data[0]) {
            $rootScope.newCommonRoom = true;
            $rootScope.editingCommonRoom = undefined;
          }
          else {
            $rootScope.newCommonRoom = false;
            $rootScope.editingCommonRoom = data;
          }
          
          $rootScope.dialog = $dialog.dialog($scope.opts);
          $rootScope.dialog.open();
      }
  }])
  .controller('EditCommonRoomModal', ['CommonRoom', 'ImageHandler', '$scope', '$dialog', '$rootScope', '$cookieStore', 'BANNER_REQS', 'HOMEBG_REQS', function EditCommonRoomModal(CommonRoom, ImageHandler, $scope, $dialog, $rootScope, $cookieStore, BANNER_REQS, HOMEBG_REQS) {
      $scope.editingCommonRoom = $rootScope.editingCommonRoom;
      $scope.form = {};
      $scope.bannerReqs = BANNER_REQS;
      $scope.homeBGReqs = HOMEBG_REQS;
      
      $scope.form.isPublic = true;
      if($rootScope.editingCommonRoom) {
          $scope.form.commonRoomID = $rootScope.editingCommonRoom[0];
          $scope.form.name = $rootScope.editingCommonRoom[1];
          $scope.form.description = $rootScope.editingCommonRoom[2];
          
          if($rootScope.editingCommonRoom[4])
              $scope.form.isPublic = true;
          else
              $scope.form.isPublic = false;
      }
      
      $scope.isNameValid = true;
      $scope.isDescriptionValid = true;
      $scope.isBannerDimensionsValid = true;
      $scope.isBannerFileValid = true;
      $scope.isHomeBGDimensionsValid = true;
      $scope.isHomeBGFileValid = true;
      
      $scope.close = function() {
          $rootScope.dialog.close();
      }
      // @TODO: update common room stored proc/server logic
      $scope.save = function() {
          var textValidation = /^(?!undefined)[a-zA-Z0-9!@\$%\^&\-_ ]+$/;
          $scope.isNameValid = textValidation.test($scope.form.name);
          $scope.isDescriptionValid = textValidation.test($scope.form.description);
          $scope.bannerLoaded = false;
          $scope.homebgLoaded = false;
          
          if($scope.form.banner) {
              $scope.bannerLoaded = false;
              ImageHandler.validate($scope.form.banner, BANNER_REQS.width, BANNER_REQS.height, 1048576).then(function(value) {
                  $scope.isBannerFileValid = true;
                  $scope.isBannerDimensionsValid = value;
                  $scope.bannerFileName = $scope.form.banner.name;
                  $scope.$apply();
              }, function(reason) {
                  // error handler here
                  console.log(reason);
                  $scope.isBannerFileValid = false;
                  $scope.$apply();
              });
          }
          else {
              $scope.isBannerDimensionsValid = true;
              $scope.isBannerFileValid = true;
              $scope.bannerLoaded = true;
          }
          console.log($scope.form.homeBG);
          if($scope.form.homeBG) {
              $scope.homebgLoaded = false;
              ImageHandler.validate($scope.form.homeBG, HOMEBG_REQS.width, HOMEBG_REQS.height, 2097152).then(function(value) {
                  $scope.isHomeBGFileValid = true;
                  $scope.isHomeBGDimensionsValid = value;
                  $scope.homebgFileName = $scope.form.homeBG.name;
                  $scope.$apply();
              }, function(reason) {
                  // error handler here
                  console.log(reason);
                  $scope.isHomeBGFileValid = false;
                  $scope.$apply();
              });
          }
          else {
              $scope.isHomeBGFileValid = true;
              $scope.isHomeBGDimensionsValid = true;
              $scope.homebgLoaded = true;
          }
          
          $scope.$watch('bannerFileName', function(newValue, oldValue) {
              if(typeof newValue == 'string') {
                  // upload file
                  var fileName = ImageHandler.generateFileName(newValue, $cookieStore.get('user_id'));
                  var uploadPromise = ImageHandler.uploadFile('banner', fileName);
                  uploadPromise.then(function(value) {
                      console.log('banner uploaded to ' + value);
                      $scope.form.bannerURL = value;
                      $scope.bannerLoaded = true;
                      $scope.finalizeSave();
                  }, function(reason) {
                      // error handler here
                      console.log(reason);
                  });
              }
          });
          
          $scope.$watch('homebgFileName', function(newValue, oldValue) {
              if(typeof newValue == 'string') {
                  // upload file
                  var fileName = ImageHandler.generateFileName(newValue, $cookieStore.get('user_id'));
                  var uploadPromise = ImageHandler.uploadFile('homeBG', fileName);
                  uploadPromise.then(function(value) {
                      console.log('homebg uploaded to ' + value);
                      $scope.form.homeBGURL = value;
                      $scope.homebgLoaded = true;
                      $scope.finalizeSave();
                  }, function(reason) {
                      // error handler here
                      console.log(reason);
                  });
              }
          });
          
          $scope.finalizeSave();
      }
      
      $scope.finalizeSave = function() {
          if($scope.isNameValid && $scope.isDescriptionValid && $scope.isBannerFileValid && $scope.isBannerDimensionsValid && $scope.isHomeBGFileValid && $scope.isHomeBGDimensionsValid && $scope.bannerLoaded && $scope.homebgLoaded) {
              $scope.form.userid = $cookieStore.get('user_id');
              $scope.form.banner = undefined;
              $scope.form.homeBG = undefined;
              if($rootScope.newCommonRoom) {
                  console.log('CommonRoom.insert');
                  CommonRoom.insert({
                      data: $scope.form,
                      successCallback: function(data) {
                          if(data.error) {
                              // error handler here
                              console.log(data.error);
                          }
                          else if(data.result) {
                              $scope.close();
                          }
                          else {
                              // error handler here
                              console.log('insert failed, no error returned');
                          }
                      }
                  });
              }
              else {
                  console.log('CommonRoom.update');
                  CommonRoom.update({
                      data: $scope.form,
                      successCallback: function(data) {
                          if(data.error) {
                              // error handler here
                              console.log(data.error);
                          }
                          else if(data.result) {
                              $scope.close();
                          }
                          else {
                              // error handler here
                              console.log('insert failed, no error returned');
                          }
                      }
                  });
              }
          }
          else {
              console.log('errors found');
          }
      }
  }])
  .constant('BANNER_REQS', {
        width: 250,
        height: 90
  })
  .constant('HOMEBG_REQS', {
        width: 600,
        height: 600
  });
