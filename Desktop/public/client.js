

// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
var app =angular.module('app', ['formApp','ngAnimate', 'ui.router', 'ngResource','ngRoute','imageupload']);

// configuring our routes 
// =============================================================================
app.config(function($stateProvider, $urlRouterProvider,$httpProvider,$compileProvider) {
	
   
       var oldWhiteList = $compileProvider.imgSrcSanitizationWhitelist();
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)

	$stateProvider
	
		// route to show our basic form (/form)
		.state('form', {
			url: '/form',
			templateUrl: 'form.html',
			controller: 'formController',
			controller:'languageController'
		})
		
		// nested states 
		// each of these sections will have their own view
		// url will be nested (/form/profile)
		.state('form.reportlost', {
			url: '/reportlost',
			templateUrl: 'reportlost.html'
		})
		.state('form.edititem', {
			url: '/edititem',
			templateUrl: 'edit-item.html'
		})


		
		// url will be /form/interests
		.state('form.newsfeeds', {
			url: '/newsfeeds',
			templateUrl: 'newsfeeds.html'
		})
		
		// url will be /form/payment
		.state('form.reportfound', {
			url: '/reportfound',
			templateUrl: 'reportfound.html'
		})
		.state('form.reportitem', {
			url: '/reportitem',
			templateUrl: 'reportitem.html'
		})
		.state('form.edit', {
			url: '/edit',
			templateUrl: 'edit-item.html'
		})
		
		.state('form.viewitem', {
			url: '/view/:item',
			templateUrl: 'viewItem.html'
		})

		.state('form.viewitemowner', {
			url: '/viewitemowner',
			templateUrl: 'viewItemOwner.html'
		})
		.state('form.addcomment', {
			url: '/addcomment/:item',
			templateUrl: 'addComment.html'
		})
		.state('form.feedback', {
			url: '/feedback',
			templateUrl: 'contact-us-feedback.html'
		})

		.state('form.about', {
			url: '/about',
			templateUrl: 'about-us.html'
		})

		.state('form.admin', {
			url: '/admin',
			templateUrl: 'admin.html',
			abstract:true

		})
				
  		.state('form.admin.users', {
    		parent: 'form.admin',
    		url: '/adminusers',
			 templateUrl: 'adminusers.html'})

		.state('form.admin.category', {
    		parent: 'form.admin',
    		url: '/admincategories',
			 templateUrl: 'admincategories.html'})

  		.state('form.admin.items', {
    		parent: 'form.admin',
    		url: '/adminitems',
			 templateUrl: 'adminitems.html'})

  		.state('form.admin.comments', {
    		parent: 'form.admin',
    		url: '/admincomments',
			 templateUrl: 'admincomment.html'})

  		.state('form.admin.settings', {
    		parent: 'form.admin',
    		url: '/adminsettings',
			 templateUrl: 'adminSettings.html'})

		.state('form.admin.login', {
    		parent: 'form.admin',
    		url: '/adminlogin',
			 templateUrl: 'adminlogin.html'})

	
		.state('form.help', {
			url: '/help',
			templateUrl: 'help.html'
		})

		.state('form.myposts', {
			url: '/myposts',
			templateUrl: 'myPosts.html'
		});
		
		
	// catch all route
	// send users to the form page 
	$urlRouterProvider.otherwise('/form/newsfeeds');

})

;
