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
            }
        };

        var factoryMethod = function(httpPromise, successCallback, errorCallback, isArray) {
            var success = successCallback || angular.noop;
            var error = errorCallback || angular.noop;
            var isArray = isArray || false;

            return httpPromise.then(function(response) {
                var result;
				
                if (isArray) {
                    result = [];
                    for (var i = 0; i < response.data.length; i++) {
                        result.push(new Resource(response.data[i]));
                    }
                } 
                else {
                    result = new Resource(response.data);
                }

                success(result, response.status, response.headers, response.config);
                return result;
            }, function(response) {
                error(undefined, response.status, response.headers, response.config);
                return undefined;
            });
        };

        var Resource = function(data){
            angular.extend(this, data);
        };
        
        Resource.query = function(config){
		   var defaultConfigCopy = angular.copy(defaultConfig);
           var newConfig;
            
            if(angular.isObject(configObject)) {
                newConfig = angular.extend(defaultConfigCopy, config);
            } 
            else {
                newConfig = defaultConfig;
            }
            
           newConfig.url = newConfig.url + '/' + newConfig.path;
           var httpPromise = $http.get(newConfig.url, newConfig);
           return factoryMethod(httpPromise, newConfig.successCallback, newConfig.errorCallback, newConfig.isArray);
        };

        Resource.insert = function(config){
            var httpPromise = $http.post(defaultConfig.url, config.data);
            return factoryMethod(httpPromise, config.successCallback, config.errorCallback);
        };

        return Resource;

    }

    return ScribdenResourceFactory;

}]);
