angular.module('formApp')
.controller('foundController',['$scope','$http','restApi','shareData', function($scope,$http,restApi,shareData) {

var foundCtrl = this;
foundCtrl.foundItems = getFoundItems;
foundCtrl.status = {};
shareData.itemStatus = {};


  getFoundItems(); 

  function getFoundItems() {
        restApi.getFoundItems()
            .success(function (data) {
              
                foundCtrl.foundItems = data.foundItems;
              })
            .error(function (error) {
                foundCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    }
  foundCtrl.setValue = function(stat){
      shareData.itemStatus= stat;
      
    };

     foundCtrl.thumbsdownfunction = function(id){
  
        restApi.putThumbsdown(id)
            .success(function (data) {
              
               
              })
            .error(function (error) {
                foundCtrl.status = 'Unable to load customer data: ' + error.message;
            });

};


}]);