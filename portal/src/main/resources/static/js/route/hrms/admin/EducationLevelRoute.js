var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {

			$stateProvider

					/* Education Level Route */

					.state(
							'home.educationLevelList',
							{
								url : '/educationLevelList',
								templateUrl : './views/hrms/admin/educationLevel/educationLevelList.html',
								controller : 'educationLevelController'

							})

					.state(
							'home.viewEducationLevel',
							{
								url : '/viewEducationLevel',
								templateUrl : './views/hrms/admin/educationLevel/viewEducationLevel.html',
								controller : 'educationLevelController',
								params : {
									educationLevel : null
								}
							})

					.state(
							'home.addEducationLevel',
							{
								url : '/addEducationLevel',
								templateUrl : './views/hrms/admin/educationLevel/addEducationLevel.html',
								controller : 'educationLevelController',
								params : {
									educationLevel : null
								}
							})
							
					.state(
							'home.updateEducationLevel',
							{
								url : '/updateEducationLevel',
								templateUrl : './views/hrms/admin/educationLevel/updateEducationLevel.html',
								controller : 'educationLevelController',
								params : {
									educationLevel : null
								}

							})

		});