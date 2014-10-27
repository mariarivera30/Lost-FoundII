(function () {
 'use strict';

 var serviceId = 'restApi';

   // TODO: replace app with your module name
   angular.module('LostFound').factory(serviceId, ['$http', addrestApi]);

   function addrestApi($http) {
    var service = {
        getUsers:getUsers,
        getItems:getItems,
        getLostItems:getLostItems,
        getFoundItems:getFoundItems,

        getCategories:getCategories
    };

    return service;


 	function getItems(){
        return $http.get('http://136.145.116.235:3000/allItems');
	};

    function getCategories(){
        return $http.get('http://136.145.116.235:3000/allCategories');
    };

   function getLostItems(){
       return $http.get('http://136.145.116.235:3000/allLostItems');
   };

   function getFoundItems(){
       return $http.get('http://136.145.116.235:3000/allFoundItems');
   };

    function getUsers(){
        return $http.get('http://136.145.116.235:3000/allUsers');
    };
}


}

)();

