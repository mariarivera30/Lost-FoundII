control.controller('MainController', [ '$scope', '$translate','restApi','shareData',  function($scope, $translate, restApi,shareData) {
    $scope.toggleMenu = function() {
        $scope.sideMenuController.toggleLeft();
    };

    $scope.ChangeLanguage = function(lang){
        $translate.use(lang);
    };





    getCategories();
    function getCategories() {
        restApi.getCategories()
            .success(function (data) {

                $scope.categories = data.categories;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }



    $scope.comments = [
        {'name': 'Maria Rivera',
            'date':'03/08/15',
            'comment':'Las vi en el departamento'
        },
        {'name': 'Juan del Pueblo',
            'date':'03/08/15',
            'comment':'Las tiene Pedro'
        },
        {'name': 'Karla Rivera',
            'date':'03/08/15',
            'comment':'Se te calleron en el zafacon.'
        }
    ];


}]);