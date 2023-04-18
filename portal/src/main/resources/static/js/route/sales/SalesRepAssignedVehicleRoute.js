var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {

			$stateProvider
					.state(
							'home.tdv.SalesRepAssignedVehicleList',
							{
								url : '/SalesRepAssignedVehicleList',
								templateUrl : './views/sales/SalesRep_AssignedVehicles/salesRepAssignedVehicleList.html',
								controller : 'SalesRepAssignedVehicleController',

							})

					.state(
							'home.tdv.addSalesRepAssignedVehicle',
							{
								url : '/addSalesRepAssignedVehicle',
								templateUrl : './views/sales/SalesRep_AssignedVehicles/addSalesRepAssignedVehicle.html',
								controller : 'SalesRepAssignedVehicleController',
							})
					.state(
							'home.tdv.viewSalesRepAssignedVehicle',
							{
								url : '/viewSalesRepAssignedVehicle',
								templateUrl : './views/sales/SalesRep_AssignedVehicles/viewSalesRepAssignedVehicle.html',
								controller : 'SalesRepAssignedVehicleController',
								params:{
									salesRepresentative:null
								}
							})
					.state(
							'home.tdv.updateSalesRepAssignedVehicle',
							{
								url : '/updateSalesRepAssignedVehicle',
								templateUrl : './views/sales/SalesRep_AssignedVehicles/updateSalesRepAssignedVehicle.html',
								controller : 'SalesRepAssignedVehicleController',
								params:{
									salesRepresentative:null
								}
							})

		});