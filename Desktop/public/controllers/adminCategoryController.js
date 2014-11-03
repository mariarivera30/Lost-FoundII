angular.module('formApp')
.controller('adminCategoryController',['$scope','$http','$timeout','restApi','$state', function($scope,$http,$timeout,restApi,$state) {

// var categoryCtrl = this;
// categoryCtrl.categories = getCategories;
// categoryCtrl.status = {};
// categoryCtrl.deleteCat = {};
// categoryCtrl.setValue = setValue;
// categoryCtrl.deleteCategory = deleteCategory;
// categoryCtrl.postCategories = postCategories;

//   getCategories();  
 
// 	function getCategories() {
//         restApi.getCategories()
//             .success(function (data) {
              
//                 categoryCtrl.categories = data.categories;
//               })
//             .error(function (error) {
//                 categoryCtrl.status = 'Unable to load customer data: ' + error.message;
//             });
            
//     };


//  function postCategories(newCategory) {
//         restApi.postCategories(newCategory)

//           .success(function (data) {
             
//               })
//             .error(function (error) {
//                categoryCtrl.status = 'Unable to post customer data: ' + error.message;
//             });
            
//       $timeout(getCategories, 1000);
//       newCategory = {};
//     };




// function deleteCategory() {
       
//         restApi.deleteCategory(categoryCtrl.deleteCat)

//           .success(function (data) {
            
//               })
//             .error(function (error) {
//                 categoryCtrl.status = 'Unable to post customer data: ' + error.message;
//             });
//         $timeout(getCategories, 1000);
//     }; 

//  function setValue(id){
     
//       categoryCtrl.deleteCat = id;

//     };

           
	
}]);