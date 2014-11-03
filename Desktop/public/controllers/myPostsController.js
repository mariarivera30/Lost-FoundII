
angular.module('formApp')
.controller('myPostsController',['$scope','$http','restApi','shareData' , function($scope,$http,restApi,shareData) {

var myPostsCtrl = this;
myPostsCtrl.myItems = shareData.myItems;
myPostsCtrl.status ={};
myPostsCtrl.credentials = {};

myPostsCtrl.myposts = function(cred){
  myPostsCtrl.credentials = cred;
//alert(myPostsCtrl.credentials.myemail);
  restApi.getMyPosts( myPostsCtrl.credentials)
            .success(function (data) {
              shareData.myItems = data.myPosts;  
                            
              })
            .error(function (error) {
                myPostsCtrl.status = 'Unable to load customer data: ' + error.message;
            });

            
        };



    }]);