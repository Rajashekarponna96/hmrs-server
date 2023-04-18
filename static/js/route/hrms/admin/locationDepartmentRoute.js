var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {

			$stateProvider

					.state(
							'home.locationDepartmentList',
							{
								url : '/departmentList',
								templateUrl : './views/hrms/admin/departments/departmentList.html',
								controller : 'locationDepartmentController'
							})
					.state(
							'home.addLocationDepartment',
							{
								url : '/addLocationDepartment',
								templateUrl : './views/hrms/admin/departments/addDapartment.html',
								controller : 'locationDepartmentController'
							})
					.state(
							'home.updateLocationDepartment',
							{
								url : '/updateLocationDepartment',
								templateUrl : './views/hrms/admin/departments/updateDapartment.html',
								controller : 'locationDepartmentController',
								params:{
									locationDepartment:null
								}
							})

					.state(
							'home.viewLocationDepartment',
							{
								url : '/viewLocationDepartment',
								templateUrl : './views/hrms/admin/departments/viewDapartment.html',
								controller : 'locationDepartmentController',
								params:{
									locationDepartment:null
								}
							})

		});