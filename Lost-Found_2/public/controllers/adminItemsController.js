angular.module('formApp')
.controller('adminItemsController',['$scope','$http','restApi', 'shareData' , function($scope,$http,restApi,shareData) {


var itemCtrl = this;
itemCtrl.items = getItems;
shareData.commentofitem = {};
itemCtrl.setValue = setValue;
itemCtrl.status = {};

  getItems();  
  function getItems() {
        restApi.getItems()
            .success(function (data) {
              
                itemCtrl.items = data.items;
              })
            .error(function (error) {
                itemCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    }

  
  function setValue(e) {
    shareData.commentofitem = e;
  }

}]);