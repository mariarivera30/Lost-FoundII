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

 	function getItems(){
    return $http.get('/allItems');
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

}


}

)();

