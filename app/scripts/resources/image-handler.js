'use strict';
angular.module('resources.image-handler', ['resources.scribden-resource']).factory('ImageHandler', ['ScribdenResource', 'API_PATH', function (ScribdenResource, API_PATH) {

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
    
    ImageHandler.uploadFile = function(fileID, fileName) {
        var deferred = Q.defer();
        
        var s3upload = new S3Upload({
            s3_object_name: fileName,
            file_dom_selector: '#' + fileID,
            s3_sign_put_url: API_PATH.baseURL + 'signS3put',
            onProgress: function(percent, message) { // Use this for live upload progress bars
                console.log('Upload progress: ', percent, message);
            },
            onFinishS3Put: function(public_url) { // Get the URL of the uploaded file
                console.log('Upload finished: ', public_url);
                deferred.resolve(public_url);
            },
            onError: function(status) {
                console.log('Upload error: ', status);
                deferred.reject(new Error(status));
            }
        });
        
        return deferred.promise;
    }
    
    ImageHandler.generateFileName = function(fileName, userid) {
        return md5(Date.now() + userid + (Math.random() * 1000) + fileName);
    }

    return ImageHandler;

}]);
