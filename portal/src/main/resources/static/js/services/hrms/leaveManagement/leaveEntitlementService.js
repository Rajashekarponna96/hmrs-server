angular.module('srmt').service("leaveEntitlementService",function($http,HRM_CONFIG){
	this.addLeaveEntitlement=function(dataUrl,leaveEntitlement){
		return $http.post(HRM_CONFIG.URL.ADD_LEAVE_ENTITLEMENT(dataUrl),leaveEntitlement)
	};
	
	this.getLeaveEntitlementList = function(page,size){
		return $http.get(HRM_CONFIG.URL.GET_LEAVE_ENTITLEMENT_LIST(page,size));
	};
	this.SearchLeaveEntitlements = function(dataUrl){
		return $http.get(HRM_CONFIG.URL.SEARCH_LEAVE_ENTITLEMENT(dataUrl));
	};
	
	this.SearchLeaveEntitlementsCount = function(dataUrl){
		return $http.get(HRM_CONFIG.URL.SEARCH_LEAVE_ENTITLEMENT_COUNT(dataUrl));
	};
	
	this.updateLeaveEntitlement = function(id,leaveEntitlement){
		return $http.put(HRM_CONFIG.URL.UPDATE_LEAVE_ENTITLEMENT(id),leaveEntitlement);
	};
	
	this.getLeaveEntitlementsByEmployeeIdAndLeavePeriod=function(employeeId,leavePeriodId){
		return $http.get(HRM_CONFIG.URL.GET_LEAVE_ENTITLEMENTS_LEAVEPERIOD_AND_EMPLOYEE_ID(employeeId,leavePeriodId));
	}
})