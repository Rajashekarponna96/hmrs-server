angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {

					$stateProvider
							
					.state(
							'home.selfService.attendanceList',
							{
								url : '/attendanceList',
								templateUrl : './views/hrms/empSelfService/Attendance/attendanceList.html',
								controller : 'employeeAttendanceController'
							})
							
				});				