angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {

					$stateProvider
							
					.state(
							'home.selfService.myinfo.jobDetails',
							{
								url : '/jobDetails',
								templateUrl : './views/hrms/empSelfService/jobDetails/jobDetails.html',
								controller : 'jobDetailsSelfServiceController'
							})
				});									