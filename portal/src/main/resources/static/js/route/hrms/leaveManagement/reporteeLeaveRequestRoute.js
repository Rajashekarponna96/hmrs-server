	angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {

					$stateProvider
							
					.state(
							'home.leavemgmt.reporteeLeaveRequest',
							{
								url : '/reporteeLeaveRequest',
								templateUrl : './views/hrms/leaveManagement/reporteeLeaveRequest/reporteeLeaveRequest.html',
								controller : 'reporteeLeaveRequestController'
							})
					
					.state(
							'home.leavemgmt.updateReporteeLeaveRequest',
							{
								url : '/updateReporteeLeaveRequest',
								templateUrl : './views/hrms/leaveManagement/reporteeLeaveRequest/updateReporteeLeaveRequest.html',
								controller : 'reporteeLeaveRequestController',
								params : {
									empLeaveRequest : null
								}
							})
					
				});									