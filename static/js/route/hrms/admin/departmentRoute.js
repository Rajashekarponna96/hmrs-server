var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {

			$stateProvider

					.state(
							'home.departmentList',
							{
								url : '/departmentList',
								templateUrl : './views/hrms/admin/departments/departmentList.html',
								controller : 'departmentController'
							})
					.state(
							'home.addDepartment',
							{
								url : '/addDepartment',
								templateUrl : './views/hrms/admin/departments/addDepartment.html',
								controller : 'departmentController'
							})
					.state(
							'home.updateDepartment',
							{
								url : '/updateDepartment',
								templateUrl : './views/hrms/admin/departments/updateDepartment.html',
								controller : 'departmentController',
								params:{
									locationDepartment:null
								}
							})

					.state(
							'home.viewDepartment',
							{
								url : '/viewDepartment',
								templateUrl : './views/hrms/admin/departments/viewDepartment.html',
								controller : 'departmentController',
								params:{
									locationDepartment:null
								}
							})

		});