angular.module('formApp')
.controller('reportItemController',['$scope','$http','restApi','shareData', function($scope,$http,restApi,shareData) {
 var reportItemCtrl = this;
 reportItemCtrl.list ={};


    
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
	
}]);
