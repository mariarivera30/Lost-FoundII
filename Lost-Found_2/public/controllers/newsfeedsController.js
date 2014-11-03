angular.module('formApp')
.controller('newsfeedsController',['$scope','$timeout','$http','restApi','shareData', function($scope, $timeout,$http,restApi,shareData) {
  
var newsfeedCtrl = this;
newsfeedCtrl.items = getItems;
newsfeedCtrl.status = {};
shareData.itemSelected = {};
newsfeedCtrl.setValue = setValue;
newsfeedCtrl.credentials = {};
newsfeedCtrl.myItems = {};
newsfeedCtrl.isDisabled= true;
$timeout(getItems, 4000);



  getItems();  
  function getItems() {
        restApi.getItems()
            .success(function (data) {
              
                newsfeedCtrl.items = data.items;
              })
            .error(function (error) {
                newsfeedCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    };
  
  
  function setValue(e) {

    shareData.selectedItem= e;

  };

  function refresh(){
      
    };

newsfeedCtrl.thumbsdownfunction = function(id){
 
  restApi.putThumbsdown(id)
            .success(function (data) {
                   
              })
            .error(function (error) {

                newsfeedCtrl.status = 'Unable to load customer data: ' + error.message;
            });
$timeout(getItems, 10);
  
};
newsfeedCtrl.myposts = function(cred){
  newsfeedCtrl.credentials = cred;

  restApi.getMyPosts( newsfeedCtrl.credentials)
            .success(function (data) {
              newsfeedCtrl.myItems = data.myPosts;
               
              })
            .error(function (error) {
                newsfeedCtrl.status = 'Unable to load customer data: ' + error.message;
            });




};

}]);