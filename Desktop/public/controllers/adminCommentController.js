
angular.module('formApp')
.controller('adminCommentController',['$scope','$http','restApi','shareData' , function($scope,$http,restApi,shareData) {



$scope.comments

getComments();
   function getComments() {

        restApi.getComments(shareData.commentofitem)
            .success(function (data) {
              
                $scope.comments = data.comments;
                

              })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

    }]);