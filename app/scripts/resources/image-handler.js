'use strict';
angular.module('resources.image-handler', ['resources.scribden-resource']).factory('ImageHandler', ['ScribdenResource', function (ScribdenResource) {

    var ImageHandler = ScribdenResource('image-handler');
    
    ImageHandler.validate = function(file, width, height, maxFileSize) {
        var deferred = Q.defer();
        console.log(file.type);
        if (typeof window.FileReader != 'function') {
            // error handler here
            console.log('File Reader is not available on your browser. Please update your browser, or use a different one.');
            deferred.reject(new Error('File Reader is not available on your browser. Please update your browser, or use a different one.'));
        }
        
        if(file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/bmp' || file.type == 'image/tiff') {
            if(file.size > maxFileSize) {
                deferred.reject(new Error('File size exceeds maximum.'));
            }
            else {
                try {
                    var reader  = new FileReader();
                    
                    reader.onload = function(e) {
                        
                        var image = new Image();
                        image.onload = function() {
                            console.log(this.width, this.height);
                            deferred.resolve(width == this.width && height == this.height);
                        };
                        
                        image.src = e.target.result;
                    };
                    
                    reader.readAsDataURL(file);
                } catch(e) {
                    // error handler here
                    console.log(e);
                    deferred.reject(new Error(e));
                }
            }
        }
        else {
            // error handler here
            deferred.reject(new Error('File type must be *.png, *.jpg, *.bmp, or *.tiff'));
        }
        
        return deferred.promise;
    }

    return ImageHandler;

}]);
