'use strict';
angular.module('resources.conversation', ['resources.scribden-resource']).factory('Conversation', ['ScribdenResource', function (ScribdenResource) {

    var Conversation = ScribdenResource('conversation');

    return Conversation;

}]);
