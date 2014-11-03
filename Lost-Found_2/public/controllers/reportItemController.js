angular.module('formApp')
.controller('reportItemController',['$scope','$http','restApi','shareData','$base64', function($scope,$http,restApi,shareData,$base64) {
 var reportItemCtrl = this;
 reportItemCtrl.list ={};
 reportItemCtrl.image={};

reportItemCtrl.uploadFile = function(image){
    reportItemCtrl.image =image;
    alert(image);
};
    
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
    	
        $scope.encoded = $base64.encode('a string');
        $scope.decoded = $base64.decode('YSBzdHJpbmc=');

    };
	
}]);