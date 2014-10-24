(function () {
 'use strict';

 var serviceId = 'restApi';

   // TODO: replace app with your module name
   angular.module('LostFound').factory(serviceId, ['$http', addrestApi]);

   function addrestApi($http) {
    var service = {
        getUsers:getUsers,
        getItems:getItems
    };

    return service;
    function getUsers(){
    return $http.get('http://192.168.1.110:3000/allUsers');
	};

 	function getItems(){

    return $http.get('http://192.168.1.110:3000/allItems');
	};


}


}

)();

