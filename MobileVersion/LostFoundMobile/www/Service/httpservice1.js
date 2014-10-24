services.factory('restApi', function($http) {
    var users = [];

    return {
            getItems: function(){
            return $http.get('http://localhost:3000/allitems').then(function(response){
                users = response;
                return users;
            });
        }
    }
});

