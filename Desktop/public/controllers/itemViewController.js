angular.module('formApp')
.controller('itemViewController',['$scope','restApi','shareData' ,function($scope,restApi,shareData) {


 function getUser() {
        restApi.getUser()
            .success(function (custs) {
                $scope.users = custs;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
	 // we will store all of our form data in this object
	$scope.comments = [{'name': 'Maria Rivera',
	     
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
	 	},
	 	];

$scope.item = shareData.selectedItem;
	
	// function to process the form
	$scope.processForm = function() {
		alert('awesome!');
	};
	
}])
;