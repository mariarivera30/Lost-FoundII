
angular.module('formApp')
.controller('myPostsController',['$scope','$http','$stateParams','restApi','shareData','$timeout' , function($scope,$http,$stateParams,restApi,shareData,$timeout) {

var myPostsCtrl = this;
myPostsCtrl.myItems = shareData.myItems;
myPostsCtrl.status ={};
myPostsCtrl.credentials = {};

$timeout(refresh,1000);

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

            
        };

function refresh(){
  myPostsCtrl.myposts( shareData.credentials);

};



    }]);