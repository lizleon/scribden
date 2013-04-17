'use strict';
angular.module('resources.common-room', ['resources.scribden-resource']).factory('CommonRoom', ['ScribdenResource', function (ScribdenResource) {

    var CommonRoom = ScribdenResource('common-room');

    return CommonRoom;

}]);
