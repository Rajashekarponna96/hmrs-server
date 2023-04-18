var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.tdv', {
		url : '/tdv',
		abstart : true,
		templateUrl : "views/common/sub-content.html",
		controller : 'vehicleController'

	}).state('home.tdv.vehiclelist', {
		url : '/vehiclelist',
		templateUrl : './views/sales/vehicle/vehiclelist.html',
		controller : 'vehicleController',

	}).state('home.tdv.addVehicle', {
		url : '/addVehicle',
		templateUrl : './views/sales/addVehicleModel.html',
		controller : 'vehicleController',

	})

	.state('home.tdv.viewVehicle', {
		url : '/viewVehicle',
		templateUrl : './views/sales/vehicle/viewVehicle.html',
		controller : 'vehicleController',
		params : {
			vehicle : null
		}
	})

	.state('home.tdv.updateVehicle', {
		url : '/updateVehicle',
		templateUrl : './views/sales/vehicle/updateVehicle.html',
		controller : 'vehicleController',
		params : {
			vehicle : null
		}

	})
	
});