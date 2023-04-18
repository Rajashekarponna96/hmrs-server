	angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {

					$stateProvider
							
					.state(
							'home.leavemgmt.employeeLeaveRequestList',
							{
								url : '/employeeLeaveRequestList',
								templateUrl : './views/hrms/leaveManagement/employeeLeaveRequest/employeeLeaveRequestList.html',
								controller : 'employeeLeaveRequestController'
							})
					.state(
							'home.leavemgmt.addEmployeeLeaveRequest',
							{
								url : '/addEmployeeLeaveRequest',
								templateUrl : './views/hrms/leaveManagement/employeeLeaveRequest/updateLeaveRequest.html',
								controller : 'employeeLeaveRequestController'
							})
					.state(
							'home.leavemgmt.updateEmployeeLeaveRequest',
							{
								url : '/updateEmployeeLeaveRequest',
								templateUrl : './views/hrms/leaveManagement/employeeLeaveRequest/updateLeaveRequest.html',
								controller : 'employeeLeaveRequestController',
								params : {
									empLeaveRequest : null
								}
							})
					.state(
							'home.leavemgmt.viewEmployeeLeaveRequest',
							{
								url : '/viewEmployeeLeaveRequest',
								templateUrl : './views/hrms/leaveManagement/employeeLeaveRequest/viewEmployeeLeaveRequest.html',
								controller : 'employeeLeaveRequestController',
								params : {
									empLeaveRequest : null
								}
							})
				});									