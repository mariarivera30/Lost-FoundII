angular.module('formApp')
.controller('itemViewController',['$scope','restApi','shareData' ,function($scope,restApi,shareData) {

var itemViewCntrl =this;
itemViewCntrl.item=shareData.selectedItem;

getComments();
   function getComments() {
        
        restApi.getComments(shareData.selectedItem.itemid)
            .success(function (data) {
                itemViewCntrl.comments = data.comments;              
                
              })
            .error(function (error) {
                itemViewCntrl.status = 'Unable to load customer data: ' + error.message;
            });
    }


	

	

	
}])
;