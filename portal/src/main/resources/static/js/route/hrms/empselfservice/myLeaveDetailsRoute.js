angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {

					$stateProvider
							
					.state(
							'home.selfService.myLeaveDetails',
							{
								url : '/myLeaveDetails',
								templateUrl : './views/hrms/empSelfService/myLeaves/myLeaveDetails.html',
								controller : 'myLeavesController'
							})
												 
									
				});		