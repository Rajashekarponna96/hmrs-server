var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

	.state('home.locationDetails', {
		url : '/locationDetails',
		templateUrl : './views/hrms/admin/location/locationDetails.html',
		controller : 'LocationController'

	}).state('home.addLocation', {
		url : '/addLocation',
		templateUrl : './views/hrms/admin/location/addLocation.html',
		controller : 'LocationController'

	}).state('home.editLocation', {
		url : '/editLocation',
		templateUrl : './views/hrms/admin/location/editLocation.html',
		controller : 'LocationController',
		params:{
			location:null
		}

	}).state('home.viewLocation', {
		url : '/viewLocation',
		templateUrl : './views/hrms/admin/location/viewLocation.html',
		controller : 'LocationController',
		params:{
			location:null
		}


	})
});