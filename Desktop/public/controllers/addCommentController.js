angular.module('formApp')
.controller('addCommentController', ['$scope','$http','restApi','shareData' , function($scope,$http,restApi,shareData) {
	var commentCtrl =this;
	var objectComment={};
	
	getComments();

	commentCtrl.getCommentObject = function (object){
   commentCtrl.objectComment=object;
   commentCtrl.objectComment.isblocked='false';
   commentCtrl.objectComment.itemid=parseInt(shareData.selectedItem.itemid);
   postComment(commentCtrl.objectComment);
  };
	// we will store all of our form data in this object
	 function postComment(object) {
        
        restApi.postComment(object)
            .success(function (data) {
              alert('good');
              })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    };


   function getComments() {
        
        restApi.getComments(shareData.selectedItem.itemid)
            .success(function (data) {
                commentCtrl.comments = data.comments;              
                
              })
            .error(function (error) {
                commentCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    }

	


	
}]);