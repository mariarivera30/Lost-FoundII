angular.module('formApp')
.controller('newsfeedsController',['$scope','$http','restApi','shareData', function($scope,$http,restApi,shareData) {
	
var newsfeedCtrl = this;
newsfeedCtrl.items = getItems;
newsfeedCtrl.status = {};
shareData.itemSelected = {};
newsfeedCtrl.setValue = setValue;


  getItems();  
	function getItems() {
        restApi.getItems()
            .success(function (data) {
              
                newsfeedCtrl.items = data.items;
              })
            .error(function (error) {
                newsfeedCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    }
	
  
  function setValue(e) {

    shareData.selectedItem= e;

 
  }


	

}]);