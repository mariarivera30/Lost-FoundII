angular.module('formApp')
.controller('lostController',['$scope','$http','restApi','shareData', function($scope,$http,restApi,shareData) {

var lostCtrl = this;
lostCtrl.lostItems = getLostItems;
lostCtrl.status = {};
shareData.itemStatus = {};


  getLostItems();  
  function getLostItems() {
        restApi.getLostItems()
            .success(function (data) {
              
                lostCtrl.lostItems = data.lostItems;
              })
            .error(function (error) {
                lostCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    };

    lostCtrl.setValue = function(stat){
      shareData.itemStatus= stat;
     
    };


    lostCtrl.thumbsdownfunction = function(id){
  
  restApi.putThumbsdown(id)
            .success(function (data) {
              
               
              })
            .error(function (error) {
                lostCtrl.status = 'Unable to load customer data: ' + error.message;
            });

};
  
}]);