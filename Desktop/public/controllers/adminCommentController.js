
angular.module('formApp')
.controller('adminCommentController',['$scope','$http','restApi','shareData' , function($scope,$http,restApi,shareData) {

var commentCtrl = this;
commentCtrl.comments = getComments;
commentCtrl.status = {};

getComments();
   function getComments() {

        restApi.getComments(shareData.commentofitem)
            .success(function (data) {
              
                commentCtrl.comments = data.comments;
                

              })
            .error(function (error) {
                commentCtrl.status = 'Unable to load customer data: ' + error.message;
            });
    }

    }]);