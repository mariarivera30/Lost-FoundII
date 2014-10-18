(function () {
 'use strict';

 var serviceId = 'restApi';

   // TODO: replace app with your module name
   angular.module('formApp').factory(serviceId, ['$http', addrestApi]);

   function addrestApi($http) {
    var service = {
        getUsers:getUsers,
        getItems:getItems
    };

    return service;
    function getUsers(){
    return $http.get('/allUsers');
	};

 	function getItems(){
    return $http.get('/allItems');
	};

}


}

)();

