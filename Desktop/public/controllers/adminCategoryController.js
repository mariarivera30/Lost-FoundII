angular.module('formApp')
.controller('adminCategoryController', function($scope) {
	
	// we will store all of our form data in this object
	$scope.categories = [{'name': 'Date'},{'name': 'Electronics'},{'name': 'Books'},{'name': 'Bags'},{'name': 'Personal'},{'name': 'Clothes'}
	,{'name': 'Other'}];
	
});