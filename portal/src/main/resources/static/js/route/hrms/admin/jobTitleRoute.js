var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {
		
			$stateProvider

			/* jobTitleRoute */

			.state(
					'home.jobTitleList',
					{
						url : '/jobTitleList',
						templateUrl : './views/hrms/admin/jobTitle/jobTitleList.html',
						controller : 'jobTitleController'

					})
			.state(
					'home.addJobTitle',
					{
						url : '/addJobTitle',
						templateUrl : './views/hrms/admin/jobTitle/addJobTitle.html',
						controller : 'jobTitleController'

					})
			.state(
					'home.updateJobTitle',
					{
						url : '/updateJobTitle',
						templateUrl : './views/hrms/admin/jobTitle/editJobTitle.html',
						controller : 'jobTitleController',
						params : {
							updateJobTitle : null
						}
					})
			.state(
					'home.viewJobTitle',
					{
						url : '/viewJobTitle',
						templateUrl : './views/hrms/admin/jobTitle/viewJobTitle.html',
						controller : 'jobTitleController',
						params : {
							jobTitle : null
						}
					})
		});