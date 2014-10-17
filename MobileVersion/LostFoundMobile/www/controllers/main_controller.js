control.controller('MainController', [ '$scope', '$translate','$log',  function($scope, $translate, $log) {
    $scope.toggleMenu = function() {
        $scope.sideMenuController.toggleLeft();
    };

    $scope.ChangeLanguage = function(lang){
        $translate.use(lang);
    }


    $scope.categories = [{'name': 'Date'},
        {'name': 'Electronic'},
        {'name': 'Books'},
        {'name': 'Bags'},
        {'name': 'Personal'},
        {'name': 'Clothes'},
        {'name': 'Other'}];

    $scope.itemspre = [
        {'itemname': 'Chaqueta',
            'name': 'Maria Rivera',
            'itemId': '#80',
            'views': '12',
            'status':'FOUND',
            'location':'Fisica',
            'imageurl': 'http://www.vivetumoto.com/foros/attachments/chaquetas-motociclistas/2873d1356133608t-vendo-hermosa-chaqueta-icon-overlord-typer-1-dsc_0473-1-.jpg'
        },

        { 'itemname': 'Reloj',
            'name': 'Juan Rivera',
            'itemId': '#70',
            'views': '13',
            'status':'LOST',
            'location':'STEFANI',
            'imageurl': 'https://img0.etsystatic.com/023/0/6677928/il_340x270.577570516_6vcv.jpg'
        },

        { 'itemname': 'Tablet',
            'name': 'Irving Rivera',
            'itemId': '#80',
            'views': '12',
            'status':'FOUND',
            'location':'Fisica',
            'imageurl': 'http://i00.i.aliimg.com/photo/v0/353397906/10_inch_TABLET_PC_Talet_computer_10.jpg'
        },
        { 'itemname': 'Chaqueta',
            'name': 'Xavier De La Torre',
            'itemId': '#890',
            'views': '130',
            'status':'FOUND',
            'location':'Cafeteria',
            'imageurl': 'http://static.photo.net/v3graphics/20140428/equipment/medium/2964.jpg'
        },
        {'itemname': 'Chaqueta',
            'name': 'Juan Rivera',
            'itemId': '#70',
            'views': '13',
            'status':'LOST',
            'location':'STEFANI',
            'imageurl': 'http://static.photo.net/v3graphics/20140428/equipment/medium/2964.jpg'
        }

    ];
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