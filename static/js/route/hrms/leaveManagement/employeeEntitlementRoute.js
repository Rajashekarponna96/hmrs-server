	angular
		.module('srmt')
		.config(
				function($stateProvider, $urlRouterProvider) {

					$stateProvider
							
					.state(
							'home.empLeaveEntitlementList',
							{
								url : '/empLeaveEntitlementList',
								templateUrl : './views/hrms/leaveManagement/employeeEntitlement/empLeaveEntitlementList.html',
								controller : 'empLeaveEntitlementController'
							})
					.state(
							'home.addEmpLeaveEntitlement',
							{
								url : '/addEmployeeEntitlement',
								templateUrl : './views/hrms/leaveManagement/employeeEntitlement/addEmpLeaveEntitlement.html',
								controller : 'empLeaveEntitlementController'
							})
					.state(
							'home.updateEmployeeEntitlement',
							{
								url : '/updateLeaveEntitlement',
								templateUrl : './views/hrms/leaveManagement/employeeEntitlement/updateEmpLeaveEntitlement.html',
								controller : 'empLeaveEntitlementController',
								params : {
									empLeaveEntitlement : null
								}
							})
					.state(
							'home.viewEmployeeEntitlement',
							{
								url : '/viewEmployeeEntitlement',
								templateUrl : './views/hrms/leaveManagement/employeeEntitlement/viewEmpLeaveEntitlement.html',
								controller : 'empLeaveEntitlementController',
								params : {
									empLeaveEntitlement : null
								}
							})
});									