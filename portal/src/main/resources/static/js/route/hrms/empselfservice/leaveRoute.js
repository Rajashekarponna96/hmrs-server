angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {

					$stateProvider
							
					.state(
							'home.selfService.leaveDetails',
							{
								url : '/leaveDetails',
								templateUrl : './views/hrms/empSelfService/leaveDetails/leaveDetails.html',
								controller : 'leaveRequestController'
							})
							
							.state(
									'home.selfService.addLeaveRequest',
									{
										url : '/addLeaveRequest',
										templateUrl : './views/hrms/empSelfService/leaveDetails/addLeaveRequest.html',
										controller : 'leaveRequestController'
									})
									
				});		