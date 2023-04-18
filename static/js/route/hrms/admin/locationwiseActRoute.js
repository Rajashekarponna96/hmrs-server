var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {

			$stateProvider

					.state(
							'home.locationwiseActList',
							{
								url : '/location_wiseActList',
								templateUrl : './views/hrms/admin/locationAct/location_wiseActList.html',
								controller : 'location_wiseActController'
							})
					.state(
							'home.addLocation_wiseAct',
							{
								url : '/addLocation_wiseAct',
								templateUrl : './views/hrms/admin/locationAct/addLocation_wiseAct.html',
								controller : 'location_wiseActController'
							})
					.state(
							'home.updateLocation_wiseAct',
							{
								url : '/updateLocation_wiseAct',
								templateUrl : './views/hrms/admin/locationAct/updateLocation_wiseAct.html',
								controller : 'location_wiseActController',
								params:{
									locationWiseAct:null
								}
							})

					.state(
							'home.viewLocationWiseAct',
							{
								url : '/viewLocationWiseAct',
								templateUrl : './views/hrms/admin/locationAct/viewLocationWiseAct.html',
								controller : 'location_wiseActController',
								params:{
									locationWiseAct:null
								}
							})

		});