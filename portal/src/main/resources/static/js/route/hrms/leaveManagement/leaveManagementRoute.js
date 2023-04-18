angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {

					$stateProvider
							.state('home.leavemgmt', {
								url : '/leavemgmt',
								abstract : true,
								templateUrl : "views/common/sub-content.html",
								controller : 'leaveEntitlementController'
							})
							.state(
									'home.leavemgmt.leaveEntitlementList',
									{
										url : '/leaveEntitlementList',
										templateUrl : './views/hrms/leaveManagement/leaveEntitlement/leaveEntitlementList.html',
										controller : 'leaveEntitlementController'
									})
							.state(
									'home.leavemgmt.addLeaveEntitlement',
									{
										url : '/addLeaveEntitlement',
										templateUrl : './views/hrms/leaveManagement/leaveEntitlement/addLeaveEntitlement.html',
										controller : 'leaveEntitlementController'
									})
							.state(
									'home.leavemgmt.updateLeaveEntitlement',
									{
										url : '/updateLeaveEntitlement',
										templateUrl : './views/hrms/leaveManagement/leaveEntitlement/updateLeaveEntitlement.html',
										controller : 'leaveEntitlementController',
										params : {
											leaveEntitlement : null
										}
									})
							.state(
									'home.leavemgmt.viewLeaveEntitlement',
									{
										url : '/viewLeaveEntitlement',
										templateUrl : './views/hrms/leaveManagement/leaveEntitlement/viewLeaveEntitlement.html',
										controller : 'leaveEntitlementController',
										params : {
											leaveEntitlement : null
										}
									})
				});