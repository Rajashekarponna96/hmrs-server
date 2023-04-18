angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {
					$stateProvider

							.state(
									'home.attendance.reporteeAttendance',
									{

										url : '/reporteeAttendanceList',
										templateUrl : './views/hrms/attendance/reporteeAttendanceList.html',
										controller : 'reporteeAttendanceController'

									})
							.state(
									'home.attendance.uploadReporteeAttendance',
									{
										url : '/uploadReporteeAttendance',
										templateUrl : './views/hrms/attendance/uploadAttendance.html',
										controller : 'reporteeAttendanceController'
									})
							.state(
									'home.attendance.updateReporteeAttendance',
									{

										url : '/updateReporteeAttendance',
										templateUrl : './views/hrms/attendance/updateReporteeAttendance.html',
										controller : 'reporteeAttendanceController',
										params : {
											attendance : null
										}

									})
							.state(
									'home.attendance.viewReporteeAttendance',
									{

										url : '/viewReporteeAttendance',
										templateUrl : './views/hrms/attendance/viewReporteeAttendance.html',
										controller : 'reporteeAttendanceController',
											params : {
												attendance : null
											}
									})

				})