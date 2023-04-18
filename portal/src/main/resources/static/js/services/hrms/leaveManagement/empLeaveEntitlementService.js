angular.module('srmt').service("empLeaveEntitlementService",function($http,HRM_CONFIG){
	this.addEmpLeaveEntitlement=function(empLeaveEntitlement){
		return $http.post(HRM_CONFIG.URL.ADD_LEAVE_ENTITLEMENT(),empLeaveEntitlement)
	};
	
	this.getEmpLeaveEntitlementList = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_LEAVE_ENTITLEMENT_LIST(page,size));
	};
});