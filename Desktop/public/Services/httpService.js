(function () {
 'use strict';

 var serviceId = 'restApi';

   // TODO: replace app with your module name
   angular.module('formApp').factory(serviceId, ['$http', addrestApi]);

   function addrestApi($http) {
    var service = {
        getUsers:getUsers,
        getItems:getItems,
        getCategories:getCategories,
        getLostItems:getLostItems,
        getFoundItems:getFoundItems,
        postCategories:postCategories,
        getComments:getComments

    };

    return service;
    function getUsers(){
    return $http.get('/allUsers');
	};

 	function getItems(){
    return $http.get('/allItems');
	};

  function getCategories(){
    return $http.get('/allCategories');
  };

  function postCategories(newCategory){
    var data = {type:newCategory};
    return $http.post('/aCategories/', data);
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

}


}

)();

