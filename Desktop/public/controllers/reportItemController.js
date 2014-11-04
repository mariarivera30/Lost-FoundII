angular.module('formApp')
.controller('reportItemController',['$scope','$http','restApi','shareData','fileUpload', function($scope,$http,restApi,shareData,fileUpload) {
 var reportItemCtrl = this;
 reportItemCtrl.list ={};

reportItemCtrl.initButtonText = function($scope) {
    var input = document.createElement("input");
 
    input.setAttribute("multiple", "true");
 
    if (input.multiple === true && !qq.android()) {
        $scope.uploadButtonText = "Select Files";
    }
    else {
        $scope.uploadButtonText = "Select a File";
    }
}    
	function postItem() {
        restApi.postItem(reportItemCtrl.list)
            .success(function (data) {
              
                
              })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    };


    reportItemCtrl.setValue = function (x){
    	reportItemCtrl.list = x;
        reportItemCtrl.list.itemStatus = shareData.itemStatus;
    	
    	postItem();
    	

    };
 reportItemCtrl.uploadFile = function(myFile){
      
        var file = myFile;
        console.log('file is ' + JSON.stringify(file));
        var uploadUrl = "/upload";
        fileUpload.uploadFileToUrl(file, uploadUrl);
  
    };

    reportItemCtrl.single = function(image) {
         var formData = new FormData();
                    formData.append('image', image, image.name);

                    $http.post('upload', formData, {
                        headers: { 'Content-Type': false },
                        transformRequest: angular.identity
                    }).success(function(result) {
                        reportItemCtrl.uploadedImgSrc = result.src;
                       reportItemCtrl.sizeInBytes = result.size;
                    });
                    

                    };
	
}]);
