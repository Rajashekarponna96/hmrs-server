var app = angular.module('srmt');
app.config(function($stateProvider, $urlRouterProvider) {
		
			$stateProvider

			/** Leave Type * */

			.state(
					'home.leaveTypeList',
					{
						url : '/leaveTypeList',
						templateUrl : './views/hrms/admin/leaveType/leaveTypeList.html',
						controller : 'leaveTypeController'
					})
			.state(
					'home.addLeaveType',
					{
						url : '/addLeaveType',
						templateUrl : './views/hrms/admin/leaveType/addLeaveType.html',
						controller : 'leaveTypeController',
						params : {
							leaveTypeData : null
						}
					})
			.state(
					'home.updateLeaveType',
					{
						url : '/updateLeaveType',
						templateUrl : './views/hrms/admin/leaveType/updateLeaveType.html',
						controller : 'leaveTypeController',
						params : {
							leaveTypeData : null
						}
					})
			.state(
					'home.viewLeaveType',
					{
						url : '/viewLeaveType',
						templateUrl : './views/hrms/admin/leaveType/viewLeaveType.html',
						controller : 'leaveTypeController',
						params : {
							leaveTypeData : null
						}
					})
			
		});