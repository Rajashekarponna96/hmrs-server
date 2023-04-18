var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {
		
			$stateProvider

			/* EmployementType Route */

			.state(
					'home.employmentTypeList',
					{
						url : '/employmentTypeList',
						templateUrl : './views/hrms/admin/employmentType/employmentTypeList.html',
						controller : 'employmentTypeController'

					})
			.state(
					'home.updateEmploymentType',
					{
						url : '/updateEmploymentType',
						templateUrl : './views/hrms/admin/employmentType/updateEmploymentType.html',
						controller : 'employmentTypeController',
						params : {
							employmentType : null
						}	

					})
			.state(
					'home.addEmploymentType',
					{
						url : '/addEmploymentType',
						templateUrl : './views/hrms/admin/employmentType/addEmploymentType.html',
						controller : 'employmentTypeController',
						params : {
							employmentType : null
						}

					})
				.state(
					'home.viewEmploymentType',
					{
						url : '/viewEmploymentType',
						templateUrl : './views/hrms/admin/employmentType/viewEmploymentType.html',
						controller : 'employmentTypeController',
						params : {
							employmentType : null
						}

					})
		});