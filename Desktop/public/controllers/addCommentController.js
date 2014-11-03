angular.module('formApp')
.controller('addCommentController', ['$scope','$http','$stateParams','restApi','shareData' , function($scope,$http,$stateParams,restApi,shareData) {
	var commentCtrl =this;
	var objectComment={};
	commentCtrl.itemid=$stateParams.item;
	

	commentCtrl.getCommentObject = function (object){
   commentCtrl.objectComment=object;
   commentCtrl.objectComment.isblocked='false';
   commentCtrl.objectComment.itemid=commentCtrl.itemid;
   postComment();
  };
	// we will store all of our form data in this object
	 function postComment() {
        
        restApi.postComment(commentCtrl.objectComment)
            .success(function (data) {
             
              })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    };



	


	
}]);