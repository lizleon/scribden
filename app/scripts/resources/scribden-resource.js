'use strict';
angular.module('resources.scribden-resource', []).factory('ScribdenResource', ['$http', 'API_PATH', function($http, API_PATH){

    function ScribdenResourceFactory(resource){

        var defaultConfig = {
            url: API_PATH.baseURL + resource,
            path: '',
            params: {},
            data: {},
            headers: {},
            cache: false,
            isArray: false,
            successCallback: function(result, status, headers, config){
            },
            errorCallback: function(undefined, status, headers, config){
                // generic error handler here
                console.log('Error');
                console.log(status);
                console.log(headers);
                console.log(config);
            }
        };

        var factoryMethod = function(httpPromise, successCallback, errorCallback, isArray) {
            var success = successCallback || angular.noop;
            var error = errorCallback || angular.noop;
            var isArray = isArray || false;

            return httpPromise.then(function(value) {
                var result;
				
                if (isArray) {
                    result = [];
                    for (var i = 0; i < value.data.length; i++) {
                        result.push(new Resource(value.data[i]));
                    }
                } 
                else {
                    result = new Resource(value.data);
                }

                success(result, value.status, value.headers, value.config);
                return result;
            }, function(reason) {
                console.log(reason);
                error(undefined, reason.status, reason.headers, reason.config);
                return undefined;
            });
        };

        var Resource = function(data){
            angular.extend(this, data);
        };
        
        Resource.query = function(config){
            try {
               var defaultConfigCopy = angular.copy(defaultConfig);
               var newConfig;
                
                if(angular.isObject(config)) {
                    newConfig = angular.extend(defaultConfigCopy, config);
                } 
                else {
                    newConfig = defaultConfig;
                }
                
                newConfig.url = newConfig.url + '/' + newConfig.path;
                var httpPromise = $http.get(newConfig.url, newConfig);
            } catch(e) {
                // error handler here
                console.log(e);
            }
            return factoryMethod(httpPromise, newConfig.successCallback, newConfig.errorCallback, newConfig.isArray);
        };
        
        Resource.update = function(config){
            var httpPromise = $http.post(defaultConfig.url + '/update', config.data);
            return factoryMethod(httpPromise, config.successCallback, config.errorCallback);
        };

        Resource.insert = function(config){
            var httpPromise = $http.post(defaultConfig.url, config.data);
            return factoryMethod(httpPromise, config.successCallback, config.errorCallback);
        };

        return Resource;

    }

    return ScribdenResourceFactory;

}]);
