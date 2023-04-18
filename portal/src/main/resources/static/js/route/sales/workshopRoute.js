var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.workshop', {
		url : '/workshop',
		abstart : true,
		templateUrl : "views/common/sub-content.html",
		controller : 'workshopController'
			
	}).state('home.workshop.workshoplist', {
		url : '/workshoplist',
		templateUrl : './views/sales/workshop/workshoplist.html',
		controller : 'workshopController',
		 
	}).state('home.workshop.addWorkshop', {
		url : '/addWorkshop',
		templateUrl : './views/sales/workshop/addWorkshop.html',
		controller : 'workshopController',
		 
	})
	
	.state('home.workshop.viewWorkshop', {
		url : '/viewWorkshop',
		templateUrl : './views/sales/workshop/viewWorkshop.html',
		controller : 'workshopController',
		params : {
			workshop : null
		}
	})
	
	.state('home.workshop.updateWorkshop',{
		url : '/updateWorkshop',
		templateUrl : './views/sales/workshop/updateWorkshop.html',
		controller : 'workshopController',
		params:{
			workshop : null
		}
	})

});