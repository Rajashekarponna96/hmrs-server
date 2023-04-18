	/* jobCategory Route */
var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {
		
			$stateProvider
					.state(
							'home.designationList',
							{
								url : '/designationList',
								templateUrl : './views/hrms/admin/designation/designationList.html',
								controller : 'designationController'
							})
					.state(
							'home.addDesignation',
							{
								url : '/addDesignation',
								templateUrl : './views/hrms/admin/designation/addDesignation.html',
								controller : 'designationController'
							})
					.state(
							'home.updateDesignation',
							{
								url : '/updateDesignation',
								templateUrl : './views/hrms/admin/designation/updateDesignation.html',
								controller : 'designationController',
								params : {
									designation : null
								}
							})
					.state(
							'home.viewDesignation',
							{
								url : '/viewDesignation',
								templateUrl : './views/hrms/admin/designation/viewDesignation.html',
								controller : 'designationController',
								params : {
									designation : null
								}
							})		
							
		})