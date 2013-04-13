'use strict';
angular.module('resources.user', ['resources.scribden-resource']).factory('User', ['ScribdenResource', function (ScribdenResource) {

    var User = ScribdenResource('user');

    return User;

}]);
