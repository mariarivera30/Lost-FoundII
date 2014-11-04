angular.module('formApp')
.controller('categoryController',['$scope','$http','$timeout','restApi','$state', function($scope,$http,$timeout,restApi,$state) {

var categoryCtrl = this;
categoryCtrl.categories = {
	'0':'Bags',
	'1':'Books',
	'2':'Clothes',
	'3':'Electronics',
	'4':'Tools',
	'5':'Other'

};


categoryCtrl.setValue = function(category){
	alert(category);
};



           
	
}]);