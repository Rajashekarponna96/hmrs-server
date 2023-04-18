var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home.vehicle.vehicleCategoryList', {
		url : '/vehicleCategoryList',
		templateUrl : './views/sales/vehicleCategory/vehicleCategoryList.html',
		controller : 'vehicleCategoryController',
		 
	}).state('home.vehicle.addVehicleCategory', {
		url : '/addVehicleCategory',
		templateUrl : './views/sales/vehicleCategory/addVehicleCategory.html',
		controller : 'vehicleCategoryController',
 
	})
	
	.state('home.vehicle.viewVehicleCategory', {
		url : '/viewVehicleCategory',
		templateUrl : './views/sales/vehicleCategory/viewVehicleCategory.html',
		controller : 'vehicleCategoryController',
		params : {
			vehicleType : null
		}
	})
	
	.state('home.vehicle.updateVehicleCategory',{
		url : '/updateVehicleCategory',
		templateUrl : './views/sales/vehicle/updateVehicleCategory.html',
		controller : 'vehicleCategoryController',
		params:{
			vehicleType : null
		}
		
	})

});