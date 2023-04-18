angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {
					$stateProvider
							.state('home.attendance', {
								url : '/attendance',
								abstart : true,
								templateUrl : "views/common/sub-content.html",
								controller : 'attendanceController'

							})

							.state(
									'home.attendance.attendanceList',
									{

										url : '/attendanceList',
										templateUrl : './views/hrms/attendance/attendanceList.html',
										controller : 'attendanceController'

									})
							.state(
									'home.attendance.uploadAttendance',
									{
										url : '/uploadAttendance',
										templateUrl : './views/hrms/attendance/uploadAttendance.html',
										controller : 'attendanceController'
									})
							.state(
									'home.attendance.updateAttendance',
									{

										url : '/updateAttendance',
										templateUrl : './views/hrms/attendance/updateAttendance.html',
										controller : 'attendanceController',
										resolve : {
											loadPlugin : function($ocLazyLoad) {
												return $ocLazyLoad
														.load([
																,
																{
																	insertBefore : '#loadBefore',
																	name : 'toaster',
																	files : [
																			'js/plugins/clockpicker/clockpicker.js',
																			'css/plugins/clockpicker/clockpicker.css' ]
																} ]);
											}
										},
										params : {
											attendance : null
										}

									})
							.state(
									'home.attendance.viewAttendance',
									{

										url : '/attendanceList',
										templateUrl : './views/hrms/attendance/viewAttendance.html',
										controller : 'attendanceController',
										params : {
											attendance : null
										}

									})

				})