	/* jobCategory Route */
var app = angular.module('srmt');
app
		.config(function($stateProvider, $urlRouterProvider) {
		
			$stateProvider
					.state(
							'home.jobCategoryList',
							{
								url : '/jobCategoryList',
								templateUrl : './views/hrms/admin/jobCategory/jobCategoryList.html',
								controller : 'JobCategoryController'
							})
					.state(
							'home.addJobCategory',
							{
								url : '/addJobCategory',
								templateUrl : './views/hrms/admin/jobCategory/addJobCategory.html',
								controller : 'JobCategoryController'
							})
					.state(
							'home.editJobCategory',
							{
								url : '/editJobCategory',
								templateUrl : './views/hrms/admin/jobCategory/editJobCategory.html',
								controller : 'JobCategoryController',
								params : {
									jobCategory : null
								}
							})
					.state(
							'home.viewJobCategory',
							{
								url : '/viewJobCategory',
								templateUrl : './views/hrms/admin/jobCategory/viewJobCategory.html',
								controller : 'JobCategoryController',
								params : {
									viewJobCategory : null
								}
							})		
							
		})