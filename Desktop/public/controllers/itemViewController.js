angular.module('formApp')
.controller('itemViewController',['$scope','$stateParams','restApi','shareData' ,function($scope,$stateParams,restApi,shareData) {

var itemViewCntrl =this;
getItemID();
getComments();



function getItemID(){
  restApi.getItemId($stateParams.item)
            .success(function (data) {
                itemViewCntrl.item= data.item[0];              
                
              })
            .error(function (error) {
                itemViewCntrl.status = 'Unable to load customer data: ' + error.message;
            });

        return itemViewCntrl.item;
}

   function getComments() {
        
        restApi.getComments($stateParams.item)
            .success(function (data) {
                itemViewCntrl.comments = data.comments;              
                
              })
            .error(function (error) {
                itemViewCntrl.status = 'Unable to load customer data: ' + error.message;
            });
    }


	

	

	
}])
;