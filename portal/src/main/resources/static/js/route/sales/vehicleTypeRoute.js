var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.vehicle.vehicleTypeList', {
		url : '/vehicleTypeList',
		templateUrl : './views/sales/vehicleType/vehicleTypelist.html',
		controller : 'vehicleTypeController',
		 
	}).state('home.vehicle.addVehicleType', {
		url : '/addVehicleType',
		templateUrl : './views/sales/vehicleType/addVehicleType.html',
		controller : 'vehicleTypeController',
 
	})
	
	.state('home.vehicle.viewVehicleType', {
		url : '/viewVehicleType',
		templateUrl : './views/sales/vehicleType/viewVehicleType.html',
		controller : 'vehicleTypeController',
		params : {
			vehicleType : null
		}
	})
	
	.state('home.vehicle.updateVehicleType',{
		url : '/updateVehicleType',
		templateUrl : './views/sales/vehicle/updateVehicleType.html',
		controller : 'vehicleTypeController',
		params:{
			vehicleType : null
		}
		
	})

});