(function () {
 'use strict';

 var serviceId = 'restApi';

   // TODO: replace app with your module name
   angular.module('formApp').factory(serviceId, ['$http', addrestApi]);

   function addrestApi($http) {
    var service = {
        getUsers:getUsers,
        getItems:getItems,
        getItemId:getItemId,
        getItemsAdmin:getItemsAdmin,
        getLostItems:getLostItems,
        getFoundItems:getFoundItems,
        getComments:getComments,
        getUserAdmin:getUserAdmin,        
        postUser:postUser,
        postComment:postComment,
        postFeedback:postFeedback,
        postItem:postItem,
        putThumbsdown:putThumbsdown,
        getMyPosts:getMyPosts,

        blockAdminUser:blockAdminUser,
        unblockAdminUser:unblockAdminUser,
        blockAdminItem:blockAdminItem,
        unblockAdminItem:unblockAdminItem,
        getItemSearchAdmin:getItemSearchAdmin,
        getAdmins:getAdmins,
        removeAdmin:removeAdmin,

        postItemPic:postItemPic


    };


    return service;

    function postItemPic(image){
    return $http.post('/upload',image,{
                        headers: { 'Content-Type': false },
                        transformRequest: angular.identity
                    });
  };
   
        
    function getUsers(){

    return $http.get('/allUsers');
	};


  function getAdmins(){
    return $http.get('/allAdmins');
  };

 	function getItems(){
    return $http.get('/allItems');
	};

  function getItemsAdmin(){
    return $http.get('/allItemsAdmin');
  };

  // function getCategories(){
  //   return $http.get('/allCategories');
  // };

  // function postCategories(newCategory){
  //   var data = {type:newCategory};
  //   return $http.post('/aCategories/', data);
  // };
  function getItemId(id){
    return $http.get('/itemId/' + id );
  };

  function getLostItems(){
    return $http.get('/allLostItems');
  };

  function getFoundItems(){
    return $http.get('/allFoundItems');
  };

  function getComments(id){
    return $http.get('/allComments/'+id);
  };
  function postUser(newUser){
    var data= newUser;
    return $http.post('/newUser/',data);
  };

  function postComment(comment){
    var data= comment;
    return $http.post('/addComment/',data);
  };
  function postFeedback(feedback){
    var data= feedback;
    return $http.post('/addFeedback/',data);
  };

  function getUserAdmin(id){
    return $http.get('/anUser/'+id);
  };


  function getItemSearchAdmin(id){
    return $http.get('/anItem/'+id);
  };

  // function deleteCategory(id){
  //   return $http.delete('/deleteCategory/'+id);
  // };

  function postItem(newItem){
     var data = {type:newItem};
    return $http.post('/postItem/', data);
  };

  function putThumbsdown(id){
    var data = {id:id};
    return $http.post('/putThumbsdown/',data);
  };

  function getMyPosts(cred){
   
    return $http.get('/myPostsItems/'+cred.myemail+'/'+cred.mykey);
  };

  function blockAdminUser(id){
    var data = {id:id};
    return $http.post('/blockAdminUser/',data);
  };

  function unblockAdminUser(id){
    var data = {id:id};
    return $http.post('/unblockAdminUser/',data);
  };

  function blockAdminItem(id){
    var data = {id:id};
    return $http.post('/blockAdminItem/',data);
  };

  function unblockAdminItem(id){
    var data = {id:id};
    return $http.post('/unblockAdminItem/',data);
  };

  function removeAdmin(id){
    var data = {id:id};
    return $http.post('/removeAdmin/',data);
  };

}


}

)();

