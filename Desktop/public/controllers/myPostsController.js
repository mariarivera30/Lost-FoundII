
angular.module('formApp')
.controller('myPostsController',['$scope','$http','$stateParams','restApi','shareData','$state' , function($scope,$http,$stateParams,restApi,shareData,$state) {

var myPostsCtrl = this;
myPostsCtrl.myItems = shareData.myItems;
myPostsCtrl.status ={};
myPostsCtrl.credentials = {};



myPostsCtrl.myposts = function(cred){
   shareData.credentials = cred;
  myPostsCtrl.credentials = cred;
//alert(myPostsCtrl.credentials.myemail);
  restApi.getMyPosts( myPostsCtrl.credentials)
            .success(function (data) {
              shareData.myItems = data.myPosts;  
                            
              })
            .error(function (error) {
                myPostsCtrl.status = 'Unable to load customer data: ' + error.message;
            });

            $state.load()
        };




    }]);