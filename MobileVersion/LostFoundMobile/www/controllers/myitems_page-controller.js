control.controller('myitems1PageController', [ '$scope','restApi','$state', function($scope, restApi, $state) {
    $scope.myItem_navTitle = 'myItem';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];

    var credentials ={};
    var response ={};



    $scope.login = function(username,password) {
        credentials = {'email':username,'key':password};

        restApi.getAuth(credentials)
            .success(function (data) {
            response = data.user;
        })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });



    };
    $scope.check = function() {
        if (response.username === email && response.passkey === key)
            $scope.nose = 'Brega el if';
        else {
            $scope.nose = 'es falso brega el if'
        }

    }





}]);






control.controller('myitems2PageController', [ '$scope', '$state', function($scope, $state) {
    $scope.myItem_navTitle = 'myItems';

    $scope.leftButtons = [{
        type: 'button-icon icon ion-navicon',
        tap: function(e) {
            $scope.toggleMenu();
        }
    }];

    $scope.setValue = function(e) {
        $scope.itemSelected = e;
        shareData.selectedItem = e;
    };


}]);